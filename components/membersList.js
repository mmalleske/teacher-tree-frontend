import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Card, Button, List, Divider } from "antd";
import MemberListItem from "./memberListItem";
import { UserContext } from "../contexts/UserContext";

const MembersList = ({ school }) => {
  const [donor, setDonor] = useState(null); // State to store donor information
  const [teachers, setTeachers] = useState([]); // State to store favorite teachers
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false)

  console.log(school, "members lsit")

  useEffect(() => {
    if (user?.userId) {
      fetchTeachers(school.memberIds);
    }
  }, [user]);

  const fetchTeachers = async (teacherIds) => {
    setLoading(true)
    try {
      const response = await axios.post(`${process.env.API_BASE_URL}/teachers/get-by-ids`, {
        teacherIds,
      });
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching favorite teachers:', error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {loading ? <p>Loading Members...</p> : (
        !!teachers.length ? (
          <List
            itemLayout="horizontal"
            dataSource={teachers}
            renderItem={(teacher) => (
              <MemberListItem teacher={teacher} school={school} fetchTeachers={fetchTeachers} />
            )}
          />
        ) : (
          <p>You currently have no invited Members.</p>
        )
      )}
    </>
  )
}

export default MembersList;
