import { useEffect, useState } from "react"
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

export default function Favorites() {
    const [studentParent, setStudentParent] = useState(null);

    useEffect(() => {
        const fetchStudentParent = async () => {
            try {
                // Make a GET request to the /student-parent endpoint
                const response = await axios.get('http://localhost:8000/api/student-parent', {
                    withCredentials: true, // This ensures that the Laravel backend can access the session cookie set by Sanctum
                });

                const { data } = response;
                if (data && data.studentParent) {
                    // Update the state with the student parent data
                    setStudentParent(data.studentParent);
                }
            } catch (error) {
                // Handle errors
                console.error('Error fetching student parent:', error);
            }
        };

        fetchStudentParent();
    }, []);

    return (
        <div>
            <h3>Favorite Teachers</h3>
            <p>You currently have no teachers favorited</p>
        </div>
    )
}