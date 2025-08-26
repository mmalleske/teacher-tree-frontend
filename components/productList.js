import React, { useState, useEffect } from 'react';
import { List, Form, Input, Button, message, Tabs, Card, Space } from 'antd';
import axios from 'axios';
import Product from './product';

const ProductList = ({ userId }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        if (userId) {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/products/user/${userId}`); // Replace :userId with the actual user ID
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const WishList = () => products && (
        <List
            dataSource={products.filter(product => product.listType === 'wishlist' || !product.listType)}
            renderItem={(product) => (
                <Product product={product} readOnly fetchProducts={fetchProducts} />
            )}
        />
    );

    const Consumables = () => products && (
        <List
            dataSource={products.filter(product => product.listType === 'consumables')}
            renderItem={(product) => (
                <Product product={product} readOnly fetchProducts={fetchProducts} />
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
