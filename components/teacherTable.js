import React, { useState, useEffect } from 'react';
import { Table, Input, Modal, Switch, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import useFetchTeachers from '../hooks/useFetchTeachers';

const TeacherTable = () => {
    const [searchText, setSearchText] = useState('');
    const { fetchTeachers, teachers, loading } = useFetchTeachers();
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (teachers.length) {
            setFilteredData(teachers);
        }
    }, [teachers]);

    const handleSearch = (value) => {
        setSearchText(value.toLowerCase());
    
        const filtered = teachers.filter((teacher) => {
            return (
                (teacher.email && teacher.email.toLowerCase().includes(value.toLowerCase())) ||
                (teacher.teacherData?.firstName && teacher.teacherData.firstName.toLowerCase().includes(value.toLowerCase())) ||
                (teacher.teacherData?.lastName && teacher.teacherData.lastName.toLowerCase().includes(value.toLowerCase())) ||
                (teacher.teacherData?.schoolName && teacher.teacherData.schoolName.toLowerCase().includes(value.toLowerCase())) ||
                (teacher.teacherData?.schoolDistrict && teacher.teacherData.schoolDistrict.toLowerCase().includes(value.toLowerCase()))
            );
        });
    
        setFilteredData(filtered);
    };    

    const columns = [
        {
            title: 'First Name',
            dataIndex: ['teacherData', 'firstName'], // Adjusted for teacherData
            sorter: (a, b) => (a.teacherData?.firstName || "").localeCompare(b.teacherData?.firstName || ""),
        },
        {
            title: 'Last Name',
            dataIndex: ['teacherData', 'lastName'],
            sorter: (a, b) => (a.teacherData?.lastName || "").localeCompare(b.teacherData?.lastName || ""),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => (a.email || "").localeCompare(b.email || ""),
        },
        {
            title: 'School',
            dataIndex: ['teacherData', 'schoolName'],
            sorter: (a, b) => (a.teacherData?.schoolName || "").localeCompare(b.teacherData?.schoolName || ""),
        },
        {
            title: 'School District',
            dataIndex: ['teacherData', 'schoolDistrict'],
            sorter: (a, b) => (a.teacherData?.schoolDistrict || "").localeCompare(b.teacherData?.schoolDistrict || ""),
        },
        {
            title: 'Permissions',
            dataIndex: '',
            render: (_, teacher) => (
                <Switch
                    checked={teacher.isAdmin || false} // Ensuring boolean value
                    onChange={() => toggleAdmin(teacher)}
                    checkedChildren="Admin"
                    unCheckedChildren="User"
                />
            ),
        },
    ];    

    const { confirm } = Modal;

    const createAdminProfile = async (user) => {
        const { teacherData: teacher } = user;
        try {
            const body = {
                schools: [],
                userId: user.id,
                ownerName: `${teacher.firstName} ${teacher.lastName}`,
            };

            const response = await fetch(`${process.env.API_BASE_URL}/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('authToken')}`,
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                fetchTeachers();
                message.success('User is now an Admin');
            } else {
                message.error('Failed to update permissions');
            }
        } catch (error) {
            console.error('Error updating permissions:', error);
            message.error('Failed to update permissions');
        }
    };

    const revokeAdminPermissions = async (user) => {
        try {
            const response = await fetch(
                `${process.env.API_BASE_URL}/admin/revoke-admin/${user._id}`, // FIXED: Use _id
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('authToken')}`,
                    },
                }
            );

            if (response.ok) {
                fetchTeachers();
                message.success('User is no longer an Admin');
            } else {
                message.error('Failed to update permissions');
            }
        } catch (error) {
            console.error('Error updating permissions:', error);
            message.error('Failed to update permissions');
        }
    };

    const toggleAdmin = (user) => {
        confirm({
            title: user.isAdmin ? 'Revoke Admin Permissions' : 'Grant Admin Permissions',
            content: user.isAdmin
                ? 'Are you sure you want to revoke Admin permissions? This user will lose their administrative privileges.'
                : 'Are you sure you want to make this user an Admin? This action gives them higher privileges.',
            onOk: () => (user.isAdmin ? revokeAdminPermissions(user) : createAdminProfile(user)),
            onCancel() {
                message.info('Action canceled');
            },
        });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <Input
                placeholder="Search..."
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ marginBottom: 16, width: 200 }}
                suffix={<SearchOutlined />}
            />
            <Table columns={columns} dataSource={filteredData} rowKey="_id" />
        </div>
    );
};

export default TeacherTable;