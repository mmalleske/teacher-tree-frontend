import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Layout from '../../components/layout';
import axios from 'axios';
import EditProfileForm from '../../components/editProfileForm';
import { UserContext } from '../../contexts/UserContext';

const TeacherProfilePage = () => {
    const { user } = useContext(UserContext);
    const [teacherProfile, setTeacherProfile] = useState(null);
    const [loadingTeacher, setLoadingTeacher] = useState(false);

    const fetchTeacherProfile = async (userId) => {
        setLoadingTeacher(true)
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/teachers/${userId}`); 
            setTeacherProfile(response.data);            
        } catch (error) {
            console.error('Error fetching School Staff Member profile:', error);
        } finally {
            setLoadingTeacher(false)
        }
    };

    useEffect(() => {
        const userId = user?.userId
        if (userId) {
            fetchTeacherProfile(userId)
        }
    }, [user])

    if(loadingTeacher) {
        return (
            <h1>Loading School Staff Member profile...</h1>
        )
    }
  
    return (
        <Layout>
            {teacherProfile ? (
                <EditProfileForm teacherProfile={teacherProfile} refreshTeacherProfile={fetchTeacherProfile} />
            ): (
                <h1>No School Staff Member profile for this user found.</h1>
            )} 
        </Layout>
    );
};

export default TeacherProfilePage;
