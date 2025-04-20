import React, { useState, useEffect, useContext } from 'react';
import { List, Form, Input, Button, message, Select, Tabs, Card, Switch } from 'antd';
import axios from 'axios';
import Product from './product';
import { UserContext } from "../contexts/UserContext";
import useProducts from '../hooks/useProducts';
import useSchools from '../hooks/useSchools';
import Link from "next/link"
import { CaretRightOutlined } from '@ant-design/icons';


const { Option } = Select;

const ProductUploader = ({ school }) => {
    const [form] = Form.useForm();
    const { user } = useContext(UserContext);
    const [listType, setListType] = useState('wishlist');
    const [usingManualEntry, setUsingManualEntry] = useState(false);

    const {
        products,
        fetchProducts,
        uploadAmazonProduct,
        uploadManualProduct,
        fetchingProducts,
        uploadingProduct,
    } = useProducts({ userId: user?.userId });

    const onSubmitAmazonProduct = async (values) => {
        await uploadAmazonProduct({ values, listType, schoolId: listType === "schoolList" && school?._id });
        form.resetFields();
        fetchProducts();
    };

    const onSubmitManualProduct = async (values) => {
        console.log("add manual product")
        await uploadManualProduct({ values, listType, schoolId: listType === "schoolList" && school?._id });
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
            {school && listType === "schoolList" && (
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
        <Form form={form} onFinish={onSubmitManualProduct}>
            <Form.Item
                name="title"
                rules={[{ required: true, message: 'Please enter a product title' }]}
            >
                <Input placeholder="Product Title" />
            </Form.Item>
            <Form.Item
                name="imageUrl"
                rules={[{ required: true, message: 'Please enter an image URL' }]}
            >
                <Input placeholder="Image URL" />
            </Form.Item>
            <Form.Item name="description">
                <Input.TextArea placeholder="Product Description (optional)" />
            </Form.Item>
            <Form.Item name="altLink">
                <Input placeholder="Alternate Link (optional)" />
            </Form.Item>
            <Form.Item name="quantity">
                <Input placeholder="Quantity" type="number" defaultValue={1} />
            </Form.Item>
            {school && listType === "schoolList" && (
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
    );

    const WishList = () => products && (
        <List
            dataSource={products.filter(product => product.listType === 'wishlist' || !product.listType)}
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

    const SchoolList = () => school && products && (
        <List
            dataSource={products.filter(product => product.listType === 'schoolList' && product.schoolId === school._id)}
            renderItem={(product) => (
                <Product product={product} fetchProducts={fetchProducts} />
            )}
        />
    )

    const EntrySwitch = () => (
        <div style={{ marginBottom: 16 }}>
            <p strong>Don't have an Amazon product? Enter the product manually.</p>
            <div>
                <Switch
                    label={usingManualEntry ? "Manual Entry" : "Using Amazon Link"}
                    checked={usingManualEntry}
                    onChange={(checked) => setUsingManualEntry(checked)}
                    style={{ marginLeft: 8 }}
                />
                <div>
                    <sub>{usingManualEntry ? "Switch to Amazon Link" : "Switch to Manual Entry"}</sub>
                </div>
            </div>
        </div>
    )

    const Uploader = () => (
        <>
            <EntrySwitch />
            {usingManualEntry ? <ManualUploader /> : <AmazonUploader />}
        </>
    );

    const tabItems = [
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
    ]

    if (school) {
        tabItems.push({
            label: `${school.schoolName} Supply List`,
            key: 'schoolList',
            children: [
                <div style={{ padding: "1rem 0" }} key="school-link">
                    <Link href={`/school/${school._id}`}>Go to shared School List <CaretRightOutlined /></Link>
                </div>,
                <Uploader key="uploader" />,
                <SchoolList key="schoolList" />]
        })
    }

    return (
        <Card>
            <Tabs
                onTabClick={(tab) => { setListType(tab) }}
                defaultActiveKey="wishlist"
                items={tabItems}
            />
        </Card>
    );
};

export default ProductUploader;
