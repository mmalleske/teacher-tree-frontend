import { useState } from "react";
import { Alert, Button, Modal } from "antd";
import { useRouter } from "next/router"; // Import useRouter from next/router
import useInvites from "../hooks/useInvites";

const InviteAlert = ({ invite }) => {
  const { acceptInvite, deleteInvite } = useInvites();
  const [loading, setLoading] = useState(false);
  const [closed, setClosed] = useState(false); // Tracks if the alert is closed
  const router = useRouter(); // Initialize useRouter

  const handleAccept = async () => {
    setLoading(true);
    try {
      await acceptInvite(invite._id);
      setClosed(true); // Hide alert on success
      router.push(`/school/${invite.schoolData._id}`); // Redirect to school page
    } catch (err) {
      console.error("Error accepting invite", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async () => {
    setLoading(true);
    try {
      await deleteInvite(invite._id);
      setClosed(true); // Hide alert on success
    } catch (err) {
      console.error("Error declining invite", err);
    } finally {
      setLoading(false);
    }
  };

  const showDeclineConfirm = () => {
    Modal.confirm({
      title: "Decline Invite",
      content: "Are you sure you want to decline this invite?",
      okText: "Yes, Decline",
      cancelText: "No, Keep It",
      onOk: handleDecline,
    });
  };

  return !closed ? (
    <Alert
      style={{ margin: "1rem" }}
      showIcon
      message={`Join ${invite.schoolData.schoolName}?`}
      description={
        <>
          <p>{`${invite.ownerName} has invited you to join the ${invite.schoolData.schoolName} product list.`}</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button size="small" onClick={showDeclineConfirm}>Decline</Button>
            <Button size="small" type="primary" loading={loading} onClick={handleAccept}>
              Accept
            </Button>
          </div>
        </>
      }
      type="info"
      closable
      onClose={() => setClosed(true)} // Handles manual close
    />
  ) : null;
};

export default InviteAlert;
