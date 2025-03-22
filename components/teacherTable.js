import React, { useState, useEffect } from 'react';
import { Table, Input, Modal, Switch, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import useFetchTeachers from '../hooks/useFetchTeachers';

const TeacherTable = () => {
    const [searchText, setSearchText] = useState('');
    const { fetchTeachers, teachers, loading } = useFetchTeachers();
    const [filteredData, setFilteredData] = useState(teachers);
    
    useEffect(() => {
        if(teachers && !!teachers.length) {
            setFilteredData(teachers);
        }
    }, [teachers])

    // Filter function combining text input and dropdown selection
    const handleSearch = (value) => {
        setSearchText(value);
        const filtered = teachers.filter((item) => {
            return Object.values(item).some((val) => String(val).toLowerCase().includes(value.toLowerCase()))
        }
        );
        setFilteredData(filtered);
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            sorter: (a, b) => a.lastName.localeCompare(b.lastName),
        },
        {
            title: 'School',
            dataIndex: 'schoolName',
            sorter: (a, b) => a.schoolName - b.schoolName,
        },
        {
            title: 'School District',
            dataIndex: 'schoolDistrict',
            sorter: (a, b) => a.schoolDistrict - b.schoolDistrict,
        },
        {
            title: 'Permissions',
            dataIndex: '',
            render: (_, teacher) => (
                <Switch
                    checked={teacher.isAdmin === true} // Check if isAdmin is true
                    onChange={() => toggleAdmin(teacher)}
                    checkedChildren="Admin"
                    unCheckedChildren="User"
                />
            ),
        },
    ];

    const { confirm } = Modal;

    const toggleAdmin = (teacher) => {
        const isAdmin = teacher.isAdmin || false;
        confirm({
            title: isAdmin ? 'Revoke Admin Permissions' : 'Grant Admin Permissions',
            content: isAdmin
                ? 'Are you sure you want to revoke Admin permissions? This user will lose their administrative privileges.'
                : 'Are you sure you want to make this user an Admin? This action gives them higher privileges.',
            onOk: async () => {
                try {
                    const newStatus = !isAdmin; // Toggle role
    
                    // Use fetch to make the request
                    const response = await fetch(
                        `${process.env.API_BASE_URL}/teachers/update-admin/${teacher._id}`,  // Use key as the user ID
                        {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${Cookies.get('authToken')}`,
                            },
                            body: JSON.stringify({ isAdmin: newStatus }),  // Only send isAdmin in the body
                        }
                    );
    
                    // Check if the response is successful (status code 200)
                    if (response.ok) {
                       fetchTeachers();
    
                        message.success(
                            newStatus ? 'User is now an Admin' : 'User is no longer an Admin'
                        );
                    } else {
                        message.error('Failed to update permissions');
                    }
                } catch (error) {
                    console.error('Error updating permissions:', error);
                    message.error('Failed to update permissions');
                }
            },
            onCancel() {
                message.info('Action canceled');
            },
        });
    };

    if(loading) return <p>Loading...</p>

    return (
        <div>
            <Input
                placeholder="Search..."
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ marginBottom: 16, width: 200 }}
                suffix={<SearchOutlined />}
            />
            <Table columns={columns} dataSource={filteredData} />
        </div>
    );
};

export default TeacherTable;
