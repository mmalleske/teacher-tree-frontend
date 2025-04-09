import React from 'react';
import { Form, Select, Input, Button, Divider, List } from 'antd';
import { stateCodes } from '../constants';
import useTeacherSearch from '../hooks/useTeacherSearch';
import TeacherListItem from '../components/teacherListItem';
import MemberListItem from './memberListItem';

const TeacherSearch = ({ donor, school, listType, includeNameSearch }) => {
    const [form] = Form.useForm();
    const { loading, error, results, searchTeachers } = useTeacherSearch();

    const handleSearch = () => {
        form.validateFields()
            .then((values) => {
                searchTeachers(values);
            })
            .catch((errorInfo) => {
                console.error('Validation failed:', errorInfo);
            });
    };

    const validateSchoolFields = (_, value) => {
        const school = form.getFieldValue('school');
        const schoolDistrict = form.getFieldValue('schoolDistrict');

        if (!school && !schoolDistrict) {
            return Promise.reject(new Error('Please enter either a school name or a school district'));
        }
        return Promise.resolve();
    };

    const getOrdinal = (number) => {
        if (typeof number !== 'number') return '';
        if (number % 100 >= 11 && number % 100 <= 13) return number + 'th';
        switch (number % 10) {
            case 1: return number + 'st';
            case 2: return number + 'nd';
            case 3: return number + 'rd';
            default: return number + 'th';
        }
    };

    return (
        <>
            <div>
                <h1>Search School Staff Members</h1>
                <sub>*Please select a state and enter either a school name or school district.</sub>
            </div>
            <Divider />
            <Form form={form} layout="vertical">
                {includeNameSearch && (
                    <>
                        <Form.Item
                            name="firstName"
                            label="First Name"                            
                        >
                           <Input placeholder="First Name" />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            label="Last Name"                            
                        >
                           <Input placeholder="Last Name" />
                        </Form.Item>
                    </>
                )}
                <Form.Item
                    name="state"
                    label="State"
                    // rules={[{ required: true, message: 'Please select a state' }]}
                >
                    <Select placeholder="Select state">
                        {stateCodes.map(state => (
                            <Select.Option key={state.code} value={state.code}>
                                {state.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="school"
                    label="School Name"
                    // rules={[{ validator: validateSchoolFields }]}
                >
                    <Input placeholder="Enter school name" />
                </Form.Item>

                <Form.Item
                    name="schoolDistrict"
                    label="School District"
                    // rules={[{ validator: validateSchoolFields }]}
                >
                    <Input placeholder="Enter school district (optional)" />
                </Form.Item>

                <Form.Item name="gradeLevel" label="Grade Level">
                    <Select placeholder="Select grade level">
                        <Select.Option key={'early-childhood'} value="Early Childhood">Early Childhood</Select.Option>
                        <Select.Option key={'pre-k'} value="Pre-K">Pre-K</Select.Option>
                        <Select.Option key={'kindergarten'} value="Kindergarten">Kindergarten</Select.Option>
                        {[...Array(12)].map((_, index) => (
                            <Select.Option key={index + 1} value={getOrdinal(index + 1)}>
                                {getOrdinal(index + 1)}
                            </Select.Option>
                        ))}
                        <Select.Option key={'other'} value="Other">Other Staff</Select.Option>
                    </Select>
                </Form.Item>

                <Button type="primary" onClick={handleSearch} loading={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </Button>
            </Form>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <Divider />
            {results && !!results.length && (
                <List
                    itemLayout="horizontal"
                    dataSource={results}
                    renderItem={(teacher) => (
                        listType === 'donor' ? (
                            <TeacherListItem teacher={teacher} donor={donor} fetchTeachers={handleSearch} />
                        ) : (
                            <MemberListItem teacher={teacher} school={school} fetchTeachers={handleSearch} />
                        )
                    )}
                />
            )}
        </>
    );
};

export default TeacherSearch;
