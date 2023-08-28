import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import TeacherProfile from '../../../components/teacherProfile';
import Layout from "../../../components/layout";
import { UserContext } from '../../../contexts/UserContext';

const TeacherProfilePage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic parameter from the URL
  const [teacher, setTeacher] = useState(null);
  const [donor, setDonor] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASE_URL}/teachers/profile/${id}`);
        setTeacher(response.data);
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };

    if (id) {
      fetchTeacher();
    }
  }, [id]);

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

  if (!teacher) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <TeacherProfile teacherProfile={teacher} donor={donor} readOnly={true} />
    </Layout>
  );
};

export default TeacherProfilePage;
