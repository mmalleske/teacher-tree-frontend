import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';

const API_BASE_URL = `${process.env.API_BASE_URL}/schools` || 'http://localhost:5000/api/schools';

const useSchools = () => {
    const [schools, setSchools] = useState([]);
    const [school, setSchool] = useState(null); // Add the state for a single school
    const [loading, setLoading] = useState(false);

    // Fetch all schools
    const fetchSchools = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}`);
            const data = await response.json();

            if (response.ok) {
                setSchools(data);
            } else {
                message.error(data.message || 'Failed to fetch schools');
            }
        } catch (error) {
            console.error('Error fetching schools:', error);
            message.error('An error occurred while fetching schools.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch a single school by ID
    const fetchSchool = useCallback(async (schoolId) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/${schoolId}`);
            const data = await response.json();

            if (response.ok) {
                setSchool(data); // Set the school state when data is fetched
            } else {
                message.error(data.message || 'Failed to fetch school');
            }
        } catch (error) {
            console.error('Error fetching school:', error);
            message.error('An error occurred while fetching the school.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Create, update, and delete functions would stay the same as before

    // Fetch schools initially when the hook is used
    useEffect(() => {
        fetchSchools();
    }, [fetchSchools]);

    return {
        schools,
        loading,
        school, // Return the school state
        fetchSchools,
        fetchSchool,
    };
};

export default useSchools;
