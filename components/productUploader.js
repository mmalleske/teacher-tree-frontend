import React, { useState, useEffect } from 'react';
import { List, Form, Input, Button, message, Tabs, Card } from 'antd';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const ProductUploader = () => {
    const [products, setProducts] = useState([]);
    const [form] = Form.useForm();
    const { data: session } = useSession();

    const fetchProducts = async () => {
        const userId = session?.user?._id
        if (userId) {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/products/${userId}`); // Replace :userId with the actual user ID
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

    };

    useEffect(() => {
        fetchProducts();
    }, [session]);

    const onFinish = async (values) => {
        const userId = session?.user?._id

        if (userId) {
            try {
                const response = await axios.post(`${process.env.API_BASE_URL}/products/new`, {
                    userId,
                    url: values.amazonLink,
                    quantity: values.quantity
                });

                if (response.data) {
                    message.success('Product added successfully');
                    form.resetFields();
                    fetchProducts(); // Fetch updated list of products
                }
            } catch (error) {
                console.error('Error adding product:', error);
            }
        }

    };

    const validateAmazonLink = (rule, value) => {
        if (!value.includes('amazon.com')) {
            return Promise.reject('Please provide a valid Amazon link');
        }
        return Promise.resolve();
    };

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
                <Input placeholder='Quantity' type='number' />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Product
                </Button>
            </Form.Item>
        </Form>
    )


    const WishList = () => (
        <List
            dataSource={products}
            renderItem={(product) => (
                <List.Item>
                    <a target="_blank" href={product.affiliateLink}>
                        <img src={product.imageUrl} />
                        <p>{product.title}</p>
                    </a>
                </List.Item>
            )}
        />
    )

    const Consumables = () => (
        <List
            dataSource={products}
            renderItem={(product) => (
                <List.Item>
                    <a target="_blank" href={product.affiliateLink}>
                        <img src={product.imageUrl} />
                        <p>{product.title}</p>
                    </a>
                </List.Item>
            )}
        />
    )

    return (
        <Card>
            <Tabs
                defaultActiveKey="wishlist"
                items={[
                    {
                        label: 'Wishlist',
                        key: 'wishlist',
                        children: [<Uploader />, <WishList />],
                    },
                    {
                        label: 'Consumables',
                        key: 'consumables',
                        children: [<Uploader />, <Consumables />]   
                    },                   
                ]}
            />            
        </Card>
    );
};

export default ProductUploader;
