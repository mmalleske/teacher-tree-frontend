import { useState } from "react";
import { Button, Modal, message } from "antd"
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import axios from "axios";

const SaveTeacherButton = ({ donor, teacher }) => {
    const isTeacherSaved = donor.savedTeachers.includes(teacher._id);
    const [savedTeacher, setSavedTeacher] = useState(isTeacherSaved);

    const handleSaveToFavorites = async () => {
        if (savedTeacher) {
            // Show a confirmation alert before removing the teacher
            Modal.confirm({
                title: "Remove School Staff Member from Favorites",
                content: "Are you sure you want to remove this School Staff Member from your favorites?",
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
                        console.error("Error removing teacher:", error);
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
                console.error("Error saving teacher:", error);
            }
        }
    };

    return (
        <div style={{margin: "1rem"}}>
            <Button
                block
                type="primary"
                icon={savedTeacher ? <HeartFilled /> : <HeartOutlined />}
                onClick={handleSaveToFavorites}
            >
                {savedTeacher ? "Saved" : "Save To Favorites"}
            </Button>            
        </div>

    )
}

export default SaveTeacherButton;