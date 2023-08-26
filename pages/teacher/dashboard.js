import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react';
import Layout from "../../components/layout";
import ProductUploader from "../../components/productUploader";
import { getSession } from "next-auth/react";
import ProfileSideBar from "../../components/profileSideBar";
import styles from "./dashboard.module.scss"
import { Col, Row } from "antd";
import axios from "axios";
import TeacherProfile from "../../components/teacherProfile";

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
    const [donor, setDonor] = useState(null);
    const { data: session } = useSession();
    const [teacherProfile, setTeacherProfile] = useState(null);
    const [loadingTeacher, setLoadingTeacher] = useState(false);

    useEffect(() => {
        const userId = session?.user?._id
        if (userId) {
            fetchTeacherProfile(userId)
        }
    }, [session])

    const fetchTeacherProfile = async (userId) => {
        setLoadingTeacher(true)
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/teachers/${userId}`); 
            setTeacherProfile(response.data);            
        } catch (error) {
            console.error('Error fetching teacher profile:', error);
        } finally {
            setLoadingTeacher(false)
        }
    };

    if(loadingTeacher) {
        return (
            <h1>Loading Teacher profile...</h1>
        )
    }

    return (
        <Layout>            
            <TeacherProfile readOnly={false} teacherProfile={teacherProfile}/>
        </Layout>
    )
}