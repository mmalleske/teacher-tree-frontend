import { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, Popconfirm, Space } from 'antd';

const { Option } = Select;

const SchoolForm = ({ onSuccess, adminProfile, initialValues }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // Populate the form when editing a school
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const method = initialValues ? 'PUT' : 'POST';
            const url = initialValues 
                ? `${process.env.API_BASE_URL}/schools/${initialValues._id}` 
                : `${process.env.API_BASE_URL}/schools`;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, ownerId: adminProfile._id }),
            });

            const data = await response.json();

            if (response.ok) {
                message.success(initialValues ? 'School updated successfully' : 'School created successfully');
                form.resetFields();
                if (onSuccess) onSuccess(data); // Callback function after success
            } else {
                message.error(data.message || 'Failed to save school');
            }
        } catch (error) {
            console.error('Error saving school:', error);
            message.error('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!initialValues?._id) return;

        try {
            const response = await fetch(`${process.env.API_BASE_URL}/schools/${initialValues._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                message.success('School deleted successfully');
                if (onSuccess) onSuccess(); // Refresh list and close modal
            } else {
                message.error('Failed to delete school');
            }
        } catch (error) {
            console.error('Error deleting school:', error);
            message.error('An error occurred while deleting.');
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                label="School Name"
                name="schoolName"
                rules={[{ required: true, message: 'Please enter the school name' }]}
            >
                <Input placeholder="Enter school name" />
            </Form.Item>

            <Form.Item
                label="School District"
                name="schoolDistrict"
                rules={[{ required: true, message: 'Please enter the school district' }]}
            >
                <Input placeholder="Enter school district" />
            </Form.Item>

            <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'Please enter the city' }]}
            >
                <Input placeholder="Enter city" />
            </Form.Item>

            <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: 'Please enter the state' }]}
            >
                <Input placeholder="Enter state" />
            </Form.Item>

            <Form.Item
                label="Grade Levels"
                name="gradeLevels"
                rules={[{ required: true, message: 'Please select at least one grade level' }]}
            >
                <Select mode="tags" placeholder="Enter or select grade levels">
                    {['Kindergarten', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map((grade) => (
                        <Option key={grade} value={grade}>{grade}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {initialValues ? 'Update School' : 'Create School'}
                    </Button>

                    {initialValues && (
                        <Popconfirm
                            title="Are you sure you want to delete this school?"
                            onConfirm={handleDelete}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="default" danger>
                                Delete School
                            </Button>
                        </Popconfirm>
                    )}
                </Space>
            </Form.Item>
        </Form>
    );
};

export default SchoolForm;
