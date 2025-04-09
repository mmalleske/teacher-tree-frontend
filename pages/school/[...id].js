import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { Select, Input, Button, List, Avatar, Card, Divider, Modal, Spin, Col, Row } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { stateCodes } from '../../constants';
import useSchools from '../../hooks/useSchools';
// import ProductUploader from '../../components/productUploader';
import SchoolProductUploader from '../../components/schoolProductUploader';
import TeacherSearch from '../../components/teacherSearch';
import { UserContext } from "../../contexts/UserContext";
import MembersList from '../../components/membersList';
import Link from 'next/link';

import "./school.module.scss";

const SchoolPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { fetchSchool, loading, school } = useSchools();
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [viewMembersModalOpen, setViewMembersModalOpen] = useState(false);
    const { user } = useContext(UserContext);

    const isAdmin = user?.isAdmin

    console.log(user)
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
                    {isAdmin && (<Link href="/admin/dashboard"><CaretLeftOutlined /> Back to Schools</Link>)}
                    <div className="school-header__info">
                        <h1>{school.schoolName}</h1>
                        <h2>{school.schoolDistrict}</h2>
                        <p>
                            {school.city}, {school.state}
                        </p>
                    </div>
                    {isAdmin && (
                        <Row className="school-header__actions" style={{gap: "8px", display: "flex"}}>
                            <Col lg={4} sm={24} xs={24}>
                                <Button block icon={<UserAddOutlined />} type="primary" onClick={() => setInviteModalOpen(true)}>
                                    Invite members
                                </Button>
                            </Col>
                            <Col lg={4} sm={24} xs={24}>
                                <Button block icon={<UserOutlined />} onClick={() => setViewMembersModalOpen(true)}>
                                    View Members
                                </Button>
                            </Col>
                        </Row>
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
                <TeacherSearch school={school} listType={'members'} includeNameSearch />
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
