import { List, Avatar, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const TeacherListItem = ({ teacher, user }) => {
    return (
        <List.Item
            actions={[
                <Button>View</Button>,
                <Button type="primary"><HeartOutlined /> Save To Favorites</Button>
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar size={100} src={teacher.profilePhotoUrl} />}
                title={`${teacher.firstName} ${teacher.lastName}`}
                description={teacher.schoolName}
            />
        </List.Item>
    )
}

export default TeacherListItem;