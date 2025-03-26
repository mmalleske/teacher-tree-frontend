import React, { useState, useEffect, useContext } from 'react';
import { List, Form, Input, Button, message, Select, Tabs, Card } from 'antd';
import axios from 'axios';
import Product from './product';
import { UserContext } from "../contexts/UserContext";
import useProducts from '../hooks/useProducts';

const { Option } = Select;

const SchoolProductUploader = ({ school }) => {
    const [form] = Form.useForm();
    const { user } = useContext(UserContext);

    if(!user) return;

    const {
        products,
        fetchProducts,
        uploadAmazonProduct,
        fetchingProducts,
        uploadingProduct,
    } = useProducts({ userId: user.userId, schoolId: school._id, fetchSchoolList: true });

    const onSubmitAmazonProduct = async (values) => {
        await uploadAmazonProduct({ values, listType: 'schoolList', schoolId: school._id });
        form.resetFields();
        fetchProducts();
    };

    const onSubmitManualProduct = async (values) => {
        await uploadAmazonProduct({ values, listType: 'schoolList', schoolId: school._id });
        form.resetFields();
        fetchProducts();
    };

    const validateAmazonLink = (rule, value) => {
        if (!value.includes('amazon.com')) {
            return Promise.reject('Please provide a valid Amazon link');
        }
        return Promise.resolve();
    };

    const AmazonUploader = () => (
        <Form form={form} onFinish={onSubmitAmazonProduct}>
            <Form.Item
                name="amazonLink"
                rules={[
                    { required: true, message: 'Please enter an Amazon link' },
                    { validator: validateAmazonLink },
                ]}
            >
                <Input placeholder="Amazon Link" />
            </Form.Item>
            <Form.Item name="quantity">
                <Input placeholder='Quantity' type='number' defaultValue={1} />
            </Form.Item>
            <Form.Item name="gradeLevel" label="Grade Level" rules={[{ required: true, message: 'Please select a grade level' }]}>
                <Select placeholder="Select grade level">
                    {school?.gradeLevels?.map((grade) => (
                        <Option key={grade} value={grade}>
                            {grade}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={uploadingProduct}>
                    Add Product
                </Button>
            </Form.Item>
        </Form>
    )

    const ManualUploader = () => (
        <Form form={form} onFinish={onFinish}>
            <Form.Item
                name="amazonLink"
                rules={[
                    { required: true, message: 'Please enter an Amazon link' },
                    { validator: validateAmazonLink },
                ]}
            >
                <Input placeholder="Amazon Link" />
            </Form.Item>
            <Form.Item name="quantity">
                <Input placeholder='Quantity' type='number' defaultValue={1} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={uploadingProduct}>
                    Add Product
                </Button>
            </Form.Item>
        </Form>
    )

    const SchoolList = () => products && (
        <List
            dataSource={products}
            renderItem={(product) => (
                <Product product={product} fetchProducts={fetchProducts} />
            )}
        />
    )

    const Uploader = AmazonUploader;

    return (
        <Card>
            <Uploader key="uploader" />
            <SchoolList key="schoolList" />
        </Card>
    );
};

export default SchoolProductUploader;
