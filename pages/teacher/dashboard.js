import { useEffect, useState, useContext } from "react";
import Layout from "../../components/layout";
import axios from "axios";
import TeacherProfile from "../../components/teacherProfile";
import { UserContext } from "../../contexts/UserContext"; // Import the UserContext
import { Card, Button } from "antd";

export default function Favorites() {
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [loadingTeacher, setLoadingTeacher] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchTeacherProfile(user.userId);
    }
  }, [user]);

  const fetchTeacherProfile = async () => {
    setLoadingTeacher(true);
    if(user?.userId) {
      try {
        const response = await axios.get(
          `${process.env.API_BASE_URL}/teachers/${user?.userId}`
        );
        setTeacherProfile(response.data);
      } catch (error) {
        console.error("Error fetching School Staff Member profile:", error);
      } finally {
        setLoadingTeacher(false);
      }
    }
  };

  const createTeacher = async () => {
    setLoading(true)
    if(user?.id) {
      try {
        const response = await axios.post(`${process.env.API_BASE_URL}/teachers`, {
          userId: user.userId
        })
        fetchTeacherProfile(user?.userId)
      } catch (error) {
        console.error('Error creating donor:', error);
      } finally {
        setLoading(false)
      }
    }
  }

  if (loadingTeacher) {
    return <h1>Loading School Staff Member profile...</h1>;
  }

  return (
    <Layout>
      {teacherProfile ? (
        <TeacherProfile readOnly={false} teacherProfile={teacherProfile} refreshProfile={fetchTeacherProfile} />
      ) : (
        <Card>
          <p>We could not find a School Staff Member profile associated with this user.</p>
          <Button loading={loading} type="primary" onClick={createTeacher}>Create One</Button>
        </Card>
      )}
    </Layout>
  );
}
