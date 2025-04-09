import React, { useState, useEffect, useContext } from 'react';
import { List, Form, Input, Button, message, Select, Tabs, Card } from 'antd';
import axios from 'axios';
import Product from './product';
import { UserContext } from "../contexts/UserContext";
import { ExportOutlined, PlusOutlined } from '@ant-design/icons';

const dummyProducts = [
    {
        _id: "111",
        quantity: 3,
        quantityPurchased: 1,
        affiliateLink: "",
        title: "Product #1",
        imageUrl: "",
        gradeLevel: "Pre-K"
    },
    {
        _id: "111",
        quantity: 2,
        quantityPurchased: 2,
        affiliateLink: "",
        title: "Product #2",
        imageUrl: "",
        gradeLevel: "Pre-K"
    },
    {
        _id: "111",
        quantity: 1,
        quantityPurchased: 0,
        affiliateLink: "",
        title: "Product #3",
        imageUrl: "",
        gradeLevel: "Pre-K"
    },
    {
        _id: "111",
        quantity: 3,
        quantityPurchased: 1,
        affiliateLink: "",
        title: "Product #1",
        imageUrl: "",
        gradeLevel: "1st Grade"
    },
    {
        _id: "111",
        quantity: 2,
        quantityPurchased: 2,
        affiliateLink: "",
        title: "Product #2",
        imageUrl: "",
        gradeLevel: "1st Grade"
    },
    {
        _id: "111",
        quantity: 1,
        quantityPurchased: 0,
        affiliateLink: "",
        title: "Product #3",
        imageUrl: "",
        gradeLevel: "1st Grade"
    },
    {
        _id: "111",
        quantity: 3,
        quantityPurchased: 1,
        affiliateLink: "",
        title: "Product #1",
        imageUrl: "",
        gradeLevel: "2nd Grade"
    },
    {
        _id: "111",
        quantity: 2,
        quantityPurchased: 2,
        affiliateLink: "",
        title: "Product #2",
        imageUrl: "",
        gradeLevel: "2nd Grade"
    },
    {
        _id: "111",
        quantity: 1,
        quantityPurchased: 0,
        affiliateLink: "",
        title: "Product #3",
        imageUrl: "",
        gradeLevel: "2nd Grade"
    },
]

const DummyProductUploader = () => {
    const [products, setProducts] = useState([]);
    const [uploadingProduct, setUploadingProduct] = useState(false);
    const [form] = Form.useForm();
    const { user } = useContext(UserContext);
    const [listType, setListType] = useState('wishlist')
    const [gradeLevel, setGradeLevel] = useState("Pre-K");
    const [currentProducts, setCurrentProducts] = useState(dummyProducts.filter((product) => product.gradeLevel === gradeLevel));

    const fetchProducts = () => {
        console.log("refetch products")
    }

    const uniqueGradeLevels = [...new Set(dummyProducts.map(product => product.gradeLevel))];

    const handleChangeGradeLevel = (value) => {
        setGradeLevel(value);
        setCurrentProducts(dummyProducts.filter((product) => product.gradeLevel === gradeLevel));
    }

    const HeaderActions = () => (
        <div>
            <div>
                <label>Select Grade Level: </label>
                <Select
                    placeholder="Select Grade Level"
                    value={gradeLevel}
                    onChange={(value) => handleChangeGradeLevel(value)}
                    style={{ minWidth: "180px" }}
                >
                    {uniqueGradeLevels.map(gradeLevelFilter => (
                        <Select.Option key={gradeLevelFilter} value={gradeLevelFilter}>
                            {gradeLevelFilter}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <Button type="primary" icon={<ExportOutlined />}>Export</Button>
        </div>
    )

    const WishList = () => products && (
        <>
            <List
                dataSource={dummyProducts.filter((product) => product.gradeLevel === gradeLevel)}
                renderItem={(product) => (
                    <Product product={product} fetchProducts={fetchProducts} gradeLevel={product.gradeLevel} />
                )}
            />
            <Button type="primary" icon={<PlusOutlined />}>Add Product to the {gradeLevel} List</Button>
        </>
    );

    return (
        <Card>
            <HeaderActions />
            <Tabs
                onTabClick={(tab) => { setListType(tab) }}
                defaultActiveKey="wishlist"
                items={[
                    {
                        label: `${gradeLevel} Wishlist`,
                        key: 'wishlist',
                        children: [<WishList key="wishlist" />],
                    },
                ]}
            />
        </Card>
    );
};

export default DummyProductUploader;
