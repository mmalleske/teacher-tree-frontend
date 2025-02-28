import React, { useState, useEffect, useContext } from 'react';
import { List, Form, Input, Button, message, Tabs, Card } from 'antd';
import axios from 'axios';
import Product from './product';
import { UserContext } from "../contexts/UserContext";

const DummyProductUploader = () => {
    const [products, setProducts] = useState([]);
    const [uploadingProduct, setUploadingProduct] = useState(false);
    const [form] = Form.useForm();
    const { user } = useContext(UserContext);
    const [listType, setListType] = useState('wishlist')

    const dummyProducts = [
        {
            _id: "111",
            quantity: 3,
            quantityPurchased: 1,
            affiliateLink: "",
            title: "Product #1",
            imageUrl: "",
        },
        {
            _id: "111",
            quantity: 2,
            quantityPurchased: 2,
            affiliateLink: "",
            title: "Product #2",
            imageUrl: "",
        },
        {
            _id: "111",
            quantity: 1,
            quantityPurchased: 0,
            affiliateLink: "",
            title: "Product #3",
            imageUrl: "",
        }
    ]

    const onFinish = async (values) => {
        setUploadingProduct(true)
        if (user) {
            try {
                message.info('Please be patient while we talk to Amazon.')
                const response = await axios.post(`${process.env.API_BASE_URL}/products/new`, {
                    userId: user.userId,
                    url: values.amazonLink,
                    quantity: values.quantity,
                    listType
                });

                if (response.data) {
                    message.success('Product added successfully');
                    setUploadingProduct(false)
                    form.resetFields();
                    fetchProducts(); // Fetch updated list of products
                }
            } catch (error) {
                console.error('Error adding product:', error);
                setUploadingProduct(false)
            }
        }

    };

    const validateAmazonLink = (rule, value) => {
        if (!value.includes('amazon.com')) {
            return Promise.reject('Please provide a valid Amazon link');
        }
        return Promise.resolve();
    };

    const fetchProducts = () => {
        console.log("refetch products")
    }

    const Uploader = () => (
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
            dataSource={dummyProducts}
            renderItem={(product) => (
                <Product product={product} fetchProducts={fetchProducts} />
            )}
        />
    );

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
                ]}
            />
        </Card>
    );
};

export default DummyProductUploader;
