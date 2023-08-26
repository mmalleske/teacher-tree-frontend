import { useEffect, useState } from "react";
import axios from "axios";
import { getSession } from 'next-auth/react';
import { Card, Button, List, Divider } from "antd";
import Layout from "../../components/layout";
import TeacherListItem from "../../components/teacherListItem";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/login', // Redirect to login page
                permanent: false,
            },
        };
    }

    // Continue loading the page normally
    return {
        props: {
            session
        },
    };
}

export default function Favorites({ session }) {
    const [donor, setDonor] = useState(null); // State to store donor information
    const [favoriteTeachers, setFavoriteTeachers] = useState([]); // State to store favorite teachers

    useEffect(() => {
        // Fetch donor information using the session's user ID
        const fetchDonor = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/donors/${session.user._id}`);
                setDonor(response.data); // Set donor information
                fetchFavoriteTeachers(response.data.savedTeachers); // Fetch favorite teachers
            } catch (error) {
                console.error('Error fetching donor:', error);
            }
        };

        if (session?.user?._id) {
            fetchDonor();
        }
    }, [session]);

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
