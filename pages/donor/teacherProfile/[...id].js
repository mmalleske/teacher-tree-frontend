import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TeacherProfile from '../../../components/teacherProfile';
import Layout from "../../../components/layout";
import { getSession } from 'next-auth/react';

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

const TeacherProfilePage = ({ session }) => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic parameter from the URL
  const [teacher, setTeacher] = useState(null);
  const [donor, setDonor] = useState(null);

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
