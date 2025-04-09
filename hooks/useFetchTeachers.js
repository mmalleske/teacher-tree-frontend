import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import Cookies from 'js-cookie';

const useFetchTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTeachers = useCallback(async () => {
        try {
            setLoading(true);

            const response = await fetch(`${process.env.API_BASE_URL}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('authToken')}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                const filteredTeachers = data.filter(user => user.teacherData) // Only users with teacherData
                    
                setTeachers(filteredTeachers);
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
