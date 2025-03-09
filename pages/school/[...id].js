import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import ProductUploader from '../../components/productUploader';
import DummyProductUploader from '../../components/dummyProductUploader';
import { UserContext } from '../../contexts/UserContext';
import { Select, Input, Button, List, Avatar, Card, Divider, Modal } from 'antd';
import { stateCodes } from '../../constants';
import SchoolSearchBar from '../../components/schoolSearchBar';
import { ExportOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import "./school.module.scss";


const getOrdinal = (number) => {
    if (typeof number !== 'number') {
        throw new Error('Input must be a number');
    }

    if (number % 100 >= 11 && number % 100 <= 13) {
        return number + 'th';
    }

    switch (number % 10) {
        case 1:
            return number + 'st';
        case 2:
            return number + 'nd';
        case 3:
            return number + 'rd';
        default:
            return number + 'th';
    }
}

const SchoolPage = () => {
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [viewMembersModalOpen, setViewMembersModalOpen] = useState(false);

    return (
        <Layout>
            <Card className="school-page">
                <div className="school-header">
                    <div className="school-header__info">
                        <h1>Super Awesome School</h1>
                        <h2>Super Awesome School District</h2>
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
                <DummyProductUploader />
            </Card>
            <Modal
                title="Invite Members"
                open={inviteModalOpen}
                onOk={() => setInviteModalOpen(false)}
                onCancel={() => setInviteModalOpen(false)}
            >
                <p>Search for a Staff Member by School</p>
                <Select
                    placeholder="Select state"
                    style={{ width: 200, marginBottom: 16 }}
                >
                    {stateCodes.map(state => (
                        <Select.Option key={state.code} value={state.code}>
                            {state.name}
                        </Select.Option>
                    ))}
                </Select>
                <>
                    <Input
                        placeholder="School District"
                        style={{ marginBottom: 16 }}

                    />
                    <Input
                        required
                        placeholder="School Name"
                        style={{ marginBottom: 16 }}

                    />
                    <Select
                        placeholder="Select grade level"
                        style={{ width: 200, marginBottom: 16 }}

                    >
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
                            <Select.Option key={index + 1} value={getOrdinal(index + 1)}>
                                {getOrdinal(index + 1)}
                            </Select.Option>
                        ))}
                        <Select.Option key={'other'} value="Other">
                            Other Staff
                        </Select.Option>
                    </Select>
                    <Button type="primary">
                        Search
                    </Button>
                </>
                <Divider />
                <p>Can't find this user on Teacher Tree? Send an invite via email.</p>
                <Input placeholder="Email" />
            </Modal>
            <Modal
                title="Members"
                open={viewMembersModalOpen}
                onOk={() => setViewMembersModalOpen(false)}
                onCancel={() => setViewMembersModalOpen(false)}
            >
                <List itemLayout="horizontal">
                    <List.Item
                        
                        actions={[
                            <Button key="view">Remove</Button>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar size={100} style={{ marginBottom: "1rem" }} />}
                            title={"Teacher #1"}
                            description={"school #1"}
                        />
                    </List.Item>
                    <List.Item
                        
                        actions={[
                            <Button key="view">Remove</Button>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar size={100} style={{ marginBottom: "1rem" }} />}
                            title={"Teacher #2"}
                            description={"school #1"}
                        />
                    </List.Item>
                    <List.Item
                        
                        actions={[
                            <Button key="view">Remove</Button>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar size={100} style={{ marginBottom: "1rem" }} />}
                            title={"Teacher #3"}
                            description={"school #1"}
                        />
                    </List.Item>
                </List>
            </Modal>
        </Layout>
    );
};

export default SchoolPage;
