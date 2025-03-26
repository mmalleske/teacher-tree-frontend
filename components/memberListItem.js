import { List, Avatar, Button, message, Popconfirm } from "antd";
import { useState, useEffect } from "react";
import styles from "./teacherListItem.module.scss";
import useInvites from "../hooks/useInvites";

const MemberListItem = ({ teacher, school, fetchTeachers }) => {
  const [savedTeacher, setSavedTeacher] = useState(false);
  const [inviteStatus, setInviteStatus] = useState(null); // To track the invite status
  
  const { createInvite, loading, error } = useInvites();

  // Check if an invite exists for the teacher for this school
  useEffect(() => {
    const checkInvite = () => {
      // Check if teacher's invites include a pending invite for the given school
      const invite = teacher.invites?.find(
        (invite) => invite.schoolId === school._id
      );
      if (invite) {
        setInviteStatus(invite.status); // Set status: 'pending', 'accepted', or 'none'
        if (invite.status === 'accepted') {
          setSavedTeacher(true);  // If accepted, mark the teacher as saved
        }
      } else {
        setInviteStatus('none');  // No invite exists
      }
    };
    checkInvite();
  }, [teacher.invites, school._id]);


  // Handle sending the invite
  const handleInviteMember = async () => {
    console.log('school', school)

    try {
      await createInvite({teacherId: teacher._id, schoolId: school.id,  ownerName: school.ownerName});  // Send the invite from the admin
      setInviteStatus('pending');  // Mark the invite as pending after it's created
      message.success('School staff member invited!');
      fetchTeachers();  // Refresh teacher list to reflect changes
    } catch (err) {
      message.error('Error inviting school staff member');
    }
  };

  // Handle removing the teacher
  const handleRemoveMember = async () => {
    try {
      // Add your remove logic here (e.g., call an API to remove the teacher from the school)
      message.success('School staff member removed!');
      fetchTeachers();  // Refresh the list
      setSavedTeacher(false);  // Reset the savedTeacher state
    } catch (err) {
      message.error('Error removing school staff member');
    }
  };

  return (
    <List.Item
      className={styles.teacherListItem}
      actions={[
        inviteStatus === 'pending' ? (
          <Button disabled>Pending</Button> // Show "Pending" if there's an invite
        ) : savedTeacher ? (
          <Popconfirm
            key="remove"
            title="Remove School Staff Member?"
            description="Are you sure you want to remove this School Staff Member from this School list?"
            onConfirm={handleRemoveMember}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Remove</Button>
          </Popconfirm>
        ) : (
          <Button key="invite-member" onClick={handleInviteMember} loading={loading}>
            Invite Member
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
