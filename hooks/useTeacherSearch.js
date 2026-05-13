// import { useState } from 'react';
// import axios from 'axios';

// const useTeacherSearch = () => {
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const searchTeachers = async ({ state, schoolDistrict, school, gradeLevel, firstName, lastName }) => {
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await axios.get(`${process.env.API_BASE_URL}/teachers/search`, {
//                 params: { state, schoolDistrict, school, gradeLevel, firstName, lastName },
//             });

//             setResults(response.data.results.filter((result => result?.firstName !== undefined || result?.lastName !== undefined )));
//         } catch (err) {
//             console.error("Error fetching teachers:", err);
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const searchSuggestions = async ({ state, schoolDistrict, school, gradeLevel, firstName, lastName }) => {
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await axios.get(`${process.env.API_BASE_URL}/teachers/searchSuggestions`, {
//                 params: { state, schoolDistrict, school, gradeLevel, firstName, lastName },
//             });

//             setResults(response.data.results.filter((result => result?.firstName !== undefined || result?.lastName !== undefined )));
//         } catch (err) {
//             console.error("Error fetching teachers:", err);
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { results, loading, error, searchTeachers, searchSuggestions };
// };

// export default useTeacherSearch;

import { useState, useCallback } from 'react';
import axios from 'axios';

const trimParam = (value) => {
    if (value == null) return undefined;
    if (typeof value !== 'string') return value;
    const trimmed = value.trim();
    return trimmed === '' ? undefined : trimmed;
};

const useTeacherSearch = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchTeachers = async ({
        firstName,
        lastName,
        schoolDistrict,
        school,
        gradeLevel,
        state,
    }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/teachers/search`, {
                params: {
                    firstName: trimParam(firstName),
                    lastName: trimParam(lastName),
                    schoolDistrict: trimParam(schoolDistrict),
                    school: trimParam(school),
                    gradeLevel: trimParam(gradeLevel),
                    state: trimParam(state),
                },
            });

            setResults(response.data.results.filter(result => result?.firstName || result?.lastName));
        } catch (err) {
            console.error("Error fetching teachers:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const searchSuggestions = async ({ searchText }) => {
        setLoading(true);
        setError(null);

        const q = trimParam(searchText);

        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/teachers/searchSuggestions`, {
                params: { searchText: q },
            });

            return response.data.results; // return results for use in the component
        } catch (err) {
            console.error("Error fetching teacher suggestions:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { results, loading, error, searchTeachers, searchSuggestions };
};

export default useTeacherSearch;
