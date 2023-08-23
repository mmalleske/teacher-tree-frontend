import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, Checkbox, DatePicker, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImageUploader from '../../components/imageUploader';
import S3ImageUploader from '../../components/s3ImageUploader';
import Layout from '../../components/layout';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import EditProfileForm from '../../components/editProfileForm';

// import TextArea from 'antd/es/input/TextArea';

const { Option } = Select;

const TeacherProfileForm = () => {
    const { data: session } = useSession();
    const [teacherProfile, setTeacherProfile] = useState(null);

    const fetchTeacherProfile = async (userId) => {
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/teachers/${userId}`); // Replace :userId with the actual user ID
            setTeacherProfile(response.data);
        } catch (error) {
            console.error('Error fetching teacher profile:', error);
        }
    };

    useEffect(() => {
        const userId = session?.user?._id
        if (userId) {
            fetchTeacherProfile(userId)
        }
    }, [session])

  
    return (
        <Layout>
            {teacherProfile ? (
                <EditProfileForm teacherProfile={teacherProfile} />
            ): (
                <h1>Loading Teacher profile</h1>
            )} 
        </Layout>
    );
};

export default TeacherProfileForm;
