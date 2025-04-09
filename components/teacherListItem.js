import { List, Avatar, Button } from "antd";
import styles from "./teacherListItem.module.scss"
import SaveTeacherButton from "./saveTeacherButton";

const TeacherListItem = ({ teacher, donor }) => {
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
