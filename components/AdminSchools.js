import { useState } from 'react';
import { Button, List, Card, Space, Modal } from 'antd';
import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import SchoolForm from './SchoolForm';

const AdminSchools = ({ adminProfile, refreshProfile }) => {
    const [showModal, setShowModal] = useState(false);
    const [editingSchool, setEditingSchool] = useState(null);
    const router = useRouter();

    const handleOnSuccess = () => {
        setShowModal(false);
        setEditingSchool(null);
        refreshProfile();
    };

    return (
        <div>
            <h2>My Schools: </h2>

            {adminProfile.schools && adminProfile.schools.length > 0 ? (
                <List
                    grid={{ gutter: 16, column: 1 }}
                    dataSource={adminProfile.schools}
                    renderItem={(school) => (
                        <List.Item>
                            <Card title={school.schoolName}>
                                <p>{school.city}, {school.state}</p>
                                <Space>
                                    <Button 
                                        icon={<EyeOutlined />} 
                                        onClick={() => router.push(`/school/${school._id}`)}
                                    >
                                        View
                                    </Button>
                                    <Button 
                                        icon={<EditOutlined />} 
                                        onClick={() => {
                                            setEditingSchool(school);
                                            setShowModal(true);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </Space>
                            </Card>
                        </List.Item>
                    )}
                />
            ) : (
                <p>No schools added yet.</p>
            )}

            <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={() => {
                    setEditingSchool(null);
                    setShowModal(true);
                }}
            >
                New School
            </Button>

            <Modal
                title={editingSchool ? 'Edit School' : 'New School'}
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={null} // Removes default buttons
                destroyOnClose
            >
                <SchoolForm 
                    adminProfile={adminProfile} 
                    onSuccess={handleOnSuccess} 
                    initialValues={editingSchool} 
                />
            </Modal>
        </div>
    );
};

export default AdminSchools;
