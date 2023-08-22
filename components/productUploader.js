import React, { useState, useEffect } from 'react';
import { List, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const ProductUploader = () => {
    const [products, setProducts] = useState([]);
    const [form] = Form.useForm();
    const { data: session } = useSession();

    console.log(session)

    const fetchProducts = async () => {
        const userId = session?.user?._id
        if (userId) {
            try {
                const response = await axios.get(`http://localhost:8000/products/${userId}`); // Replace :userId with the actual user ID
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const onFinish = async (values) => {
        const userId = session?.user?._id

        if (userId) {
            try {
                const response = await axios.post('http://localhost:8000/products/new', {
                    userId, // Replace with the actual user ID
                    url: values.amazonLink,
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

    return (
        <div>
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
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductUploader;
