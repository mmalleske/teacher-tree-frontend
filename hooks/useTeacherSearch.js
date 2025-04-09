import { useState } from 'react';
import axios from 'axios';

const useTeacherSearch = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchTeachers = async ({ state, schoolDistrict, school, gradeLevel }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/teachers/search`, {
                params: { state, schoolDistrict, school, gradeLevel },
            });

            setResults(response.data.results.filter((result => result?.firstName !== undefined || result?.lastName !== undefined )));
        } catch (err) {
            console.error("Error fetching teachers:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { results, loading, error, searchTeachers };
};

export default useTeacherSearch;
