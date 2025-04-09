import { useState, useCallback } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext'; // using your exported `useUser` hook
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const useUserActions = () => {
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const deleteAccount = useCallback(async () => {
        if (!user?.userId) return;

        setLoading(true);
        setError(null);

        try {
            await axios.delete(`${process.env.API_BASE_URL}/users/${user.userId}`);
            Cookies.remove('authToken'); // Remove token from cookies
            setUser(null);               // Clear user from context
            router.push('/');            // Redirect to homepage
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete account');
        } finally {
            setLoading(false);
        }
    }, [user?.userId, setUser, router]);

    return { deleteAccount, loading, error };
};

export default useUserActions;
