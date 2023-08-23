import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import EditProfileForm from '../../components/editProfileForm';

const TeacherProfileForm = () => {
    const { data: session } = useSession();
    const [teacherProfile, setTeacherProfile] = useState(null);
    const [loadingTeacher, setLoadingTeacher] = useState(false);

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

    useEffect(() => {
        const userId = session?.user?._id
        if (userId) {
            fetchTeacherProfile(userId)
        }
    }, [session])

    if(loadingTeacher) {
        return (
            <h1>Loading Teacher profile...</h1>
        )
    }
  
    return (
        <Layout>
            {teacherProfile ? (
                <EditProfileForm teacherProfile={teacherProfile} />
            ): (
                <h1>No teacher profile for this user found.</h1>
            )} 
        </Layout>
    );
};

export default TeacherProfileForm;
