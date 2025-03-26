import { useState } from 'react';
import axios from 'axios';

const useInvites = () => {
    const [invites, setInvites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all invites
    const fetchInvites = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/invites`);
            setInvites(response.data);
        } catch (err) {
            setError('Error fetching invites');
        } finally {
            setLoading(false);
        }
    };

    // Create a new invite with ownerName
    const createInvite = async ({ teacherId, schoolId, ownerName }) => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.API_BASE_URL}/invites`, {
                teacherId,
                schoolId,
                ownerName
            });
            setInvites((prevInvites) => [...prevInvites, response.data]);
        } catch (err) {
            setError('Error creating invite');
        } finally {
            setLoading(false);
        }
    };

    // Accept an invite
    const acceptInvite = async (inviteId) => {
        setLoading(true);
        try {
            const response = await axios.patch(`${process.env.API_BASE_URL}/invites/${inviteId}/accept`);

            // Handle successful response
            console.log(response.data.message);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            setLoading(false);
        }
    };

    // Update invite status
    const updateInviteStatus = async (inviteId, status) => {
        setLoading(true);
        try {
            const response = await axios.patch(`${process.env.API_BASE_URL}/invites/${inviteId}`, { status });
            setInvites((prevInvites) =>
                prevInvites.map((invite) =>
                    invite._id === inviteId ? { ...invite, status: response.data.status } : invite
                )
            );
        } catch (err) {
            setError('Error updating invite status');
        } finally {
            setLoading(false);
        }
    };

    // Delete an invite
    const deleteInvite = async (inviteId) => {
        setLoading(true);
        try {
            await axios.delete(`${process.env.API_BASE_URL}/invites/${inviteId}`);
            setInvites((prevInvites) => prevInvites.filter((invite) => invite._id !== inviteId));
        } catch (err) {
            setError('Error deleting invite');
        } finally {
            setLoading(false);
        }
    };

    // In your useInvites hook:
    const removeMember = async ({teacherId, schoolId}) => {
        setLoading(true);
        try {
            // Make the DELETE request to remove the teacher from the school
            const response = await axios.delete(`${process.env.API_BASE_URL}/invites/remove-member/${teacherId}/${schoolId}`);

            // Optionally, update the state after successful removal
            setInvites((prevInvites) => prevInvites.filter((invite) => invite.schoolId !== schoolId || invite.teacherId !== teacherId));

            console.log(response.data.message); // Log success message from backend
        } catch (err) {
            setError(err.response?.data?.message || 'Error removing member');
        } finally {
            setLoading(false);
        }
    };


    return {
        invites,
        loading,
        error,
        acceptInvite,
        fetchInvites,
        createInvite,
        updateInviteStatus,
        deleteInvite,
        removeMember
    };
};

export default useInvites;
