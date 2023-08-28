import { useEffect, useState, useContext } from "react";
import Layout from "../../components/layout";
import axios from "axios";
import TeacherProfile from "../../components/teacherProfile";
import { UserContext } from "../../contexts/UserContext"; // Import the UserContext

export default function Favorites() {
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [loadingTeacher, setLoadingTeacher] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchTeacherProfile(user.userId);
    }
  }, [user]);

  const fetchTeacherProfile = async (userId) => {
    setLoadingTeacher(true);
    try {
      const response = await axios.get(
        `${process.env.API_BASE_URL}/teachers/${userId}`
      );
      setTeacherProfile(response.data);
    } catch (error) {
      console.error("Error fetching teacher profile:", error);
    } finally {
      setLoadingTeacher(false);
    }
  };

  if (loadingTeacher) {
    return <h1>Loading Teacher profile...</h1>;
  }

  return (
    <Layout>
      <TeacherProfile readOnly={false} teacherProfile={teacherProfile} />
    </Layout>
  );
}
