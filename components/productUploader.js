import React, { useState, useEffect, useContext } from 'react';
import { List, Form, Input, Button, message, Select, Tabs, Card } from 'antd';
import axios from 'axios';
import Product from './product';
import { UserContext } from "../contexts/UserContext";
import useProducts from '../hooks/useProducts';

const { Option } = Select;

const ProductUploader = ({ school }) => {
    const [form] = Form.useForm();
    const { user } = useContext(UserContext);
    const [listType, setListType] = useState('wishlist');

    const {
        products,
        fetchProducts,
        uploadAmazonProduct,
        fetchingProducts,
        uploadingProduct,
    } = useProducts({ userId: user?.userId });

    const onSubmitAmazonProduct = async (values) => {
        await uploadAmazonProduct({ values, listType });
        form.resetFields();
        fetchProducts();
    };

    const onSubmitManualProduct = async (values) => {
        await uploadAmazonProduct({ values, listType });
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
            {school && (
                <Form.Item name="gradeLevel" label="Grade Level" rules={[{ required: true, message: 'Please select a grade level' }]}>
                    <Select placeholder="Select grade level">
                        {school?.gradeLevels?.map((grade) => (
                            <Option key={grade} value={grade}>
                                {grade}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            )}
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


    const WishList = () => products && (
        <List
            dataSource={products.filter(product => product.listType === 'wishlist')}
            renderItem={(product) => (
                <Product product={product} fetchProducts={fetchProducts} />
            )}
        />
    );

    const Consumables = () => products && (
        <List
            dataSource={products.filter(product => product.listType === 'consumables')}
            renderItem={(product) => (
                <Product product={product} fetchProducts={fetchProducts} />
            )}
        />
    )

    const SchoolList = () => products && (
        <List
            dataSource={products.filter(product => product.listType === 'schoolList')}
            renderItem={(product) => (
                <Product product={product} fetchProducts={fetchProducts} />
            )}
        />
    )

    const Uploader = AmazonUploader;

    return (
        <Card>
            <Tabs
                onTabClick={(tab) => { setListType(tab) }}
                defaultActiveKey="wishlist"
                items={[
                    {
                        label: 'Wishlist',
                        key: 'wishlist',
                        children: [<Uploader key="uploader" />, <WishList key="wishlist" />],
                    },
                    {
                        label: 'Consumables',
                        key: 'consumables',
                        children: [<Uploader key="uploader" />, <Consumables key="consumables" />]
                    },
                    {
                        label: 'School List',
                        key: 'schoolList',
                        children: [<Uploader key="uploader" />, <SchoolList key="schoolList" />]
                    },
                ]}
            />
        </Card>
    );
};

export default ProductUploader;
