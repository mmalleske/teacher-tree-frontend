import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Card, Button, List, Divider } from "antd";
import Layout from "../../components/layout";
import TeacherListItem from "../../components/teacherListItem";
import { UserContext } from "../../contexts/UserContext";

export default function Favorites() {
    const [donor, setDonor] = useState(null); // State to store donor information
    const [favoriteTeachers, setFavoriteTeachers] = useState([]); // State to store favorite teachers
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user?.userId) {
            fetchDonor();
        }
    }, [user]);

    const fetchFavoriteTeachers = async (teacherIds) => {
        try {
            const response = await axios.post(`${process.env.API_BASE_URL}/teachers/get-by-ids`, {
                teacherIds,
            });
            setFavoriteTeachers(response.data);
        } catch (error) {
            console.error('Error fetching favorite teachers:', error);
        }
    };

    const fetchDonor = async () => {
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/donors/${user.userId}`);
            setDonor(response.data); // Set donor information
            if (response.data) {
                fetchFavoriteTeachers(response.data.savedTeachers); // Fetch favorite teachers
            }
        } catch (error) {
            console.error('Error fetching donor:', error);
        }
    };

    const createDonor = async () => {
        setLoading(true)
        try {
            const response = await axios.post(`${process.env.API_BASE_URL}/donors`, {
                userId: user.userId
            })
            fetchDonor()
        } catch (error) {
            console.error('Error creating donor:', error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            {donor ? (
                <Card>
                    <h1>Favorite School Staff Members</h1>
                    <Button type="primary" href="/donor/teacherSearch">Search School Staff Members</Button>
                    <Divider />
                    {
                        favoriteTeachers.length > 0 ? (
                            <List
                                itemLayout="horizontal"
                                dataSource={favoriteTeachers}
                                renderItem={(teacher) => (
                                    <TeacherListItem teacher={teacher} donor={donor} fetchTeachers={fetchFavoriteTeachers} />
                                )}
                            />
                        ) : (
                            <p>You currently have no saved School Staff Members.</p>
                        )
                    }
                </Card>
            ) : (
                <Card>
                    <p>We could not find a Helper profile associated with this user.</p>
                    <Button loading={loading} type="primary" onClick={createDonor}>Create One</Button>
                </Card>
            )}
        </Layout>
    )
}
