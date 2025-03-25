import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { Select, Input, Button, List, Avatar, Card, Divider, Modal, Spin } from 'antd';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { stateCodes } from '../../constants';
import useSchools from '../../hooks/useSchools';
// import ProductUploader from '../../components/productUploader';
import SchoolProductUploader from '../../components/schoolProductUploader';
import "./school.module.scss";

const SchoolPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { fetchSchool, loading, school } = useSchools();
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [viewMembersModalOpen, setViewMembersModalOpen] = useState(false);

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
                    <div className="school-header__actions">
                        <Button icon={<UserAddOutlined />} type="primary" onClick={() => setInviteModalOpen(true)}>
                            Invite members
                        </Button>
                        <Button icon={<UserOutlined />} onClick={() => setViewMembersModalOpen(true)}>
                            View Members
                        </Button>
                        <sub>These buttons will only show for admin users</sub>
                    </div>
                </div>
                <Divider />
                <SchoolProductUploader school={school} />
            </Card>

            {/* Invite Members Modal */}
            <Modal
                title="Invite Members"
                open={inviteModalOpen}
                onOk={() => setInviteModalOpen(false)}
                onCancel={() => setInviteModalOpen(false)}
            >
                <p>Search for a Staff Member by School</p>
                <Select placeholder="Select state" style={{ width: 200, marginBottom: 16 }}>
                    {stateCodes.map((state) => (
                        <Select.Option key={state.code} value={state.code}>
                            {state.name}
                        </Select.Option>
                    ))}
                </Select>
                <Input placeholder="School District" style={{ marginBottom: 16 }} />
                <Input required placeholder="School Name" style={{ marginBottom: 16 }} />
                <Select placeholder="Select grade level" style={{ width: 200, marginBottom: 16 }}>
                    <Select.Option key={'early-childhood'} value="Early Childhood">
                        Early Childhood
                    </Select.Option>
                    <Select.Option key={'pre-k'} value="Pre-K">
                        Pre-K
                    </Select.Option>
                    <Select.Option key={'kindergarten'} value="Kindergarten">
                        Kindergarten
                    </Select.Option>
                    {[...Array(12)].map((_, index) => (
                        <Select.Option key={index + 1} value={`${index + 1}th`}>
                            {`${index + 1}th`}
                        </Select.Option>
                    ))}
                    <Select.Option key={'other'} value="Other">
                        Other Staff
                    </Select.Option>
                </Select>
                <Button type="primary">Search</Button>
                <Divider />
                <p>Can't find this user on Teacher Tree? Send an invite via email.</p>
                <Input placeholder="Email" />
            </Modal>

            {/* View Members Modal */}
            <Modal
                title="Members"
                open={viewMembersModalOpen}
                onOk={() => setViewMembersModalOpen(false)}
                onCancel={() => setViewMembersModalOpen(false)}
            >
                <List itemLayout="horizontal">
                    <List.Item actions={[<Button key="view">Remove</Button>]}>
                        <List.Item.Meta avatar={<Avatar size={100} />} title={"Teacher #1"} description={school.schoolName} />
                    </List.Item>
                    <List.Item actions={[<Button key="view">Remove</Button>]}>
                        <List.Item.Meta avatar={<Avatar size={100} />} title={"Teacher #2"} description={school.schoolName} />
                    </List.Item>
                    <List.Item actions={[<Button key="view">Remove</Button>]}>
                        <List.Item.Meta avatar={<Avatar size={100} />} title={"Teacher #3"} description={school.schoolName} />
                    </List.Item>
                </List>
            </Modal>
        </Layout>
    );
};

export default SchoolPage;
