import React, { useState, useEffect, useContext } from 'react';
import { List, Form, Input, Button, message, Tabs, Card } from 'antd';
import axios from 'axios';
import Product from './product';
import { UserContext } from "../contexts/UserContext";

const ProductUploader = () => {
    const [products, setProducts] = useState([]);
    const [uploadingProduct, setUploadingProduct] = useState(false);
    const [form] = Form.useForm();    
    const { user } = useContext(UserContext);

    const fetchProducts = async () => {        
        if (user) {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/products/${user.userId}`); // Replace :userId with the actual user ID
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

    };

    useEffect(() => {
        fetchProducts();
    }, [user]);

    const onFinish = async (values) => {
        setUploadingProduct(true)
        if (user) {
            try {
                message.info('Please be patient while we talk to Amazon.')
                const response = await axios.post(`${process.env.API_BASE_URL}/products/new`, {
                    userId: user.userId,
                    url: values.amazonLink,
                    quantity: values.quantity
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


    const WishList = () => (
        <List
            dataSource={products}
            renderItem={(product) => (
                <Product product={product} fetchProducts={fetchProducts} />
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
                        children: [<Uploader key="uploader" />, <WishList key="wishlist" />],
                    },
                    {
                        label: 'Consumables',
                        key: 'consumables',
                        children: [<Uploader key="uploader" />, <Consumables key="consumables" />]   
                    },                   
                ]}
            />            
        </Card>
    );
};

export default ProductUploader;
