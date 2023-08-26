import { useEffect, useState } from "react"
import axios from "axios";
import authOptions from "../api/auth/authConfig";
import { getSession, useSession } from 'next-auth/react';
import { Card, Button } from "antd";
import Layout from "../../components/layout"

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
        props: {},
    };
}

export default function Favorites() {
    const [studentParent, setStudentParent] = useState(null);
    const { data: session } = useSession();

    return (
        <Layout>
            <Card>
                <h3>Favorite Teachers</h3>
                <p>You currently have no saved teachers.</p>
                <Button type="primary" href="/donor/teacherSearch">Search Teachers</Button>
            </Card>
        </Layout>
    )
}