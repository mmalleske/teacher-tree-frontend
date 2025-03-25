import { List, Avatar, Button, message, Popconfirm } from "antd";
import { useState } from "react";
import axios from "axios";
import styles from "./teacherListItem.module.scss";

const MemberListItem = ({ teacher, school, fetchTeachers }) => {
  const [savedTeacher, setSavedTeacher] = useState(false);

  const handleSaveToFavorites = async () => {
    try {
      setSavedTeacher(true);
      // Uncomment this when API is ready
      // await axios.patch(
      //   `${process.env.API_BASE_URL}/donors/${donor.userId}/update-saved-teachers`,
      //   { teacherId: teacher._id, action: "add" }
      // );
      message.success("School Staff Member saved to favorites");
      fetchTeachers();
    } catch (error) {
      console.error("Error saving School Staff Member:", error);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      setSavedTeacher(false);
      // Uncomment this when API is ready
      // await axios.patch(
      //   `${process.env.API_BASE_URL}/donors/${donor.userId}/update-saved-teachers`,
      //   { teacherId: teacher._id, action: "remove" }
      // );
      message.success("School Staff Member removed from favorites");
      fetchTeachers();
    } catch (error) {
      console.error("Error removing School Staff Member:", error);
    }
  };

  return (
    <List.Item
      className={styles.teacherListItem}
      actions={[
        savedTeacher ? (
          <Popconfirm
            key="remove"
            title="Remove School Staff Member?"
            description="Are you sure you want to remove this School Staff Member from this School list?"
            onConfirm={handleRemoveFromFavorites}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Remove</Button>
          </Popconfirm>
        ) : (
          <Button key="view" href={`/donor/teacherProfile/${teacher._id}`}>
            Add Member
          </Button>
        ),
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar size={100} style={{ marginBottom: "1rem" }} src={teacher.profilePhotoUrl} />}
        title={`${teacher.firstName} ${teacher.lastName}`}
        description={teacher.schoolName}
      />
    </List.Item>
  );
};

export default MemberListItem;
