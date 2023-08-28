import React, { useState, useEffect } from 'react';
import { List, Form, Input, Button, message, Tabs, Card, Space } from 'antd';
import axios from 'axios';

const ProductList = ({ userId }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
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
    }, []);

    const WishList = () => (
        <List
            dataSource={products}
            renderItem={(product) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<a target="_blank" href={product.affiliateLink}><img src={product.imageUrl} /></a>}
                        title={<p><a target="_blank" href={product.affiliateLink}>{product.title}</a></p>}
                        description={<p>Quantity: {product.quantity}</p>}
                    />
                </List.Item>
            )}
        />
    )

    const Consumables = () => (
        <List
            dataSource={products}
            renderItem={(product) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<a target="_blank" href={product.affiliateLink}><img src={product.imageUrl} /></a>}
                        title={<p><a target="_blank" href={product.affiliateLink}>{product.title}</a></p>}
                        description={<p>Quantity: {product.quantity}</p>}
                    />
                </List.Item>
            )}
        />
    )

    return (
        <Card>
            <Space>
                <Button href="/donor/favorites" type="primary">
                    Favorite Teachers
                </Button>
                <Button href="/donor/teacherSearch">
                    Search Teachers
                </Button>
            </Space>
            <Tabs
                defaultActiveKey="wishlist"
                items={[
                    {
                        label: 'Wishlist',
                        key: 'wishlist',
                        children: <WishList />,
                    },
                    {
                        label: 'Consumables',
                        key: 'consumables',
                        children: <Consumables />
                    },
                ]}
            />
        </Card>
    );
};

export default ProductList;
