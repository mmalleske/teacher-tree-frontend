import { useContext, useEffect } from 'react';
import { Button, Card, Divider, Form, Input, List, message, Modal, Segmented, Space } from 'antd';
import { MailOutlined, LockOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../../contexts/UserContext';
import { UserContext } from '../../contexts/UserContext';
import Layout from '../../components/layout';

const dummySchools = [
    {
        "name": "School Name #1",
        "district": "School District #1"
    },
    {
        "name": "School Name #2",
        "district": "School District #2"
    },
    {
        "name": "School Name #3",
        "district": "School District #3"
    }
]

const AdminDashboard = () => {
    const router = useRouter();
    const { id } = router.query; // Get the dynamic parameter from the URL
    const [teacher, setTeacher] = useState(null);
    const [donor, setDonor] = useState(null);
    const { user } = useContext(UserContext);

    // useEffect(() => {
    //     const fetchTeacher = async () => {
    //         console.log("fetching teacher")
    //         try {
    //             const response = await axios.get(`${process.env.API_BASE_URL}/teachers/profile/${user.userId}`);
    //             setTeacher(response.data);
    //         } catch (error) {
    //             console.error('Error fetching School Staff Member:', error);
    //         }
    //     };

    //     if (user.userId) {
    //         fetchTeacher();
    //     }
    // }, []);

    // if (!teacher) {
    //     return <p>Loading...</p>;
    // }

    return (
        <Layout>
            <Card>
                <div className="admin-page__header">
                    <h1>Welcome Admin user!</h1>
                </div>
                <Divider />
                <div className="admin-page__school-list">
                    <h2>Schools:</h2>
                    <List>
                        {dummySchools.map((school, key) => (
                            <List.Item
                                key={key}                                
                                actions={[
                                    <Button key="view" href={`/school/123`}>View</Button>,
                                    <Button key="edit">Edit</Button>,
                                    <Button type="dashed" key="delete"><DeleteOutlined /></Button>
                                ]}
                            >
                                <List.Item.Meta
                                    title={school.name}
                                    description={school.district}
                                />
                            </List.Item>
                        ))}
                    </List>
                </div>
            </Card>

        </Layout>
    );
};

export default AdminDashboard;
