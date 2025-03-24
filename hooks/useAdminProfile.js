import { useState, useEffect, useContext, useCallback } from 'react';
import { UserContext } from '../contexts/UserContext';

const useAdminProfile = () => {
    const { user } = useContext(UserContext);
    const [adminProfile, setAdminProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAdminProfile = useCallback(async () => {
        if (!user?.userId) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.API_BASE_URL}/admin/${user.userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch admin profile');
            }
            const data = await response.json();
            setAdminProfile(data);
        } catch (error) {
            console.error('Error fetching Admin Profile:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [user?.userId]);

    useEffect(() => {
        fetchAdminProfile();
    }, [fetchAdminProfile]);

    return { adminProfile, fetchAdminProfile, loading, error };
};

export default useAdminProfile;
