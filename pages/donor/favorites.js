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

    useEffect(() => {
        
        const fetchDonor = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/donors/${user.userId}`);
                setDonor(response.data); // Set donor information
                fetchFavoriteTeachers(response.data.savedTeachers); // Fetch favorite teachers
            } catch (error) {
                console.error('Error fetching donor:', error);
            }
        };

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

    return (
        <Layout>
            <Card>
                <h1>Favorite Teachers</h1>
                <Button type="primary" href="/donor/teacherSearch">Search Teachers</Button>
                <Divider />
                {favoriteTeachers.length > 0 ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={favoriteTeachers}
                        renderItem={(teacher) => (
                            <TeacherListItem teacher={teacher} donor={donor} fetchTeachers={fetchFavoriteTeachers} />
                        )}
                    />
                ) : (
                    <p>You currently have no saved teachers.</p>
                )}                
            </Card>
        </Layout>
    )
}
