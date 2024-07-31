import { List, Avatar, Button, message, Modal } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import styles from "./teacherListItem.module.scss"
import SaveTeacherButton from "./saveTeacherButton";

const TeacherListItem = ({ teacher, donor, fetchTeachers }) => {
  const isTeacherSaved = donor.savedTeachers.includes(teacher._id);
  const [savedTeacher, setSavedTeacher] = useState(isTeacherSaved);

  const handleSaveToFavorites = async () => {
    if (savedTeacher) {
      // Show a confirmation alert before removing the teacher
      Modal.confirm({
        title: "Remove School Staff Member from Favorites",
        content: "Are you sure you want to remove this School Staff Member from your Favorites?",
        okText: "Yes",
        cancelText: "No",
        onOk: async () => {
          setSavedTeacher(!savedTeacher);
          try {
            // Call the API to update the donor's savedTeachers array
            await axios.patch(
              `${process.env.API_BASE_URL}/donors/${donor.userId}/update-saved-teachers`,
              { teacherId: teacher._id, action: "remove" }
            );
            message.success("School Staff Member removed from favorites");
            fetchTeachers(); // Fetch updated list of teachers
          } catch (error) {
            console.error("Error removing School Staff Member:", error);
          }
        },
      });
    } else {
      setSavedTeacher(!savedTeacher);
      try {
        // Call the API to update the donor's savedTeachers array
        await axios.patch(
          `${process.env.API_BASE_URL}/donors/${donor.userId}/update-saved-teachers`,
          { teacherId: teacher._id, action: "add" }
        );
        message.success("School Staff Member saved to favorites");
        fetchTeachers(); // Fetch updated list of teachers
      } catch (error) {
        console.error("Error saving School Staff Member:", error);
      }
    }
  };

  return (
    <List.Item
      className={styles.teacherListItem}
      actions={[
        <Button key="view" href={`/donor/teacherProfile/${teacher._id}`}>View</Button>,      
        <SaveTeacherButton key="save" teacher={teacher} donor={donor} />
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar size={100} style={{marginBottom: "1rem"}} src={teacher.profilePhotoUrl} />}
        title={`${teacher.firstName} ${teacher.lastName}`}
        description={teacher.schoolName}
      />
    </List.Item>
  );
};

export default TeacherListItem;
