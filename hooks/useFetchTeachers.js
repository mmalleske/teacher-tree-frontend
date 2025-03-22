import { useState, useContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { message } from 'antd';
import Cookies from 'js-cookie';
import { UserContext } from '../contexts/UserContext';

const useFetchTeachers = () => {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTeachers = useCallback(async () => {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.API_BASE_URL}/teachers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('authToken')}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                const filteredTeachers = data.filter(
                    (teacher) =>
                        teacher.firstName !== null && teacher.firstName !== undefined &&
                        teacher.lastName !== null && teacher.lastName !== undefined &&
                        teacher.schoolName !== null && teacher.schoolName !== undefined
                );
                setTeachers(filteredTeachers); // Assuming data is the array of teachers
            } else {
                message.error(data.message || 'Failed to fetch teachers');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            message.error('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTeachers();
    }, [fetchTeachers]);

    return { fetchTeachers, teachers, loading };
};

export default useFetchTeachers;
