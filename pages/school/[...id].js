import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { Select, Input, Button, List, Avatar, Card, Divider, Modal, Spin } from 'antd';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { stateCodes } from '../../constants';
import useSchools from '../../hooks/useSchools';
// import ProductUploader from '../../components/productUploader';
import SchoolProductUploader from '../../components/schoolProductUploader';
import TeacherSearch from '../../components/teacherSearch';
import { UserContext } from "../../contexts/UserContext";
import MembersList from '../../components/membersList';

import "./school.module.scss";

const SchoolPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { fetchSchool, loading, school } = useSchools();
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [viewMembersModalOpen, setViewMembersModalOpen] = useState(false);
    const { user } = useContext(UserContext);

    const isAdmin = user?.isAdmin

    // Fetch school data when the page loads, only if it's not already fetched
    useEffect(() => {
        if (id && !school) {
            fetchSchool(id);
        }
    }, [id, school, fetchSchool]);

    // Check for loading or school being null
    if (loading) {
        return (
            <Layout>
                <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
            </Layout>
        );
    }

    // Display message when school data is not found
    if (!school) {
        return (
            <Layout>
                <p style={{ textAlign: 'center', marginTop: '50px' }}>School not found.</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <Card className="school-page">
                <div className="school-header">
                    <div className="school-header__info">
                        <h1>{school.schoolName}</h1>
                        <h2>{school.schoolDistrict}</h2>
                        <p>
                            {school.city}, {school.state}
                        </p>
                    </div>
                    {isAdmin && (
                        <div className="school-header__actions" style={{ display: "flex", gap: "8px" }}>
                            <Button icon={<UserAddOutlined />} type="primary" onClick={() => setInviteModalOpen(true)}>
                                Invite members
                            </Button>
                            <Button icon={<UserOutlined />} onClick={() => setViewMembersModalOpen(true)}>
                                View Members
                            </Button>
                        </div>
                    )}
                </div>
                <Divider />
                <SchoolProductUploader school={school} />
            </Card>

            {/* Invite Members Modal */}
            <Modal
                title="Invite Members"
                open={inviteModalOpen}
                onCancel={() => setInviteModalOpen(false)}
                footer={[
                    <Button key="done" onClick={() => setInviteModalOpen(false)}>Done</Button>
                ]}
            >
                <TeacherSearch school={school} listType={'members'} />
            </Modal>

            {/* View Members Modal */}
            <Modal
                title="Members"
                open={viewMembersModalOpen}
                onOk={() => setViewMembersModalOpen(false)}
                onCancel={() => setViewMembersModalOpen(false)}
            >
                <MembersList school={school} />
            </Modal>
        </Layout>
    );
};

export default SchoolPage;
