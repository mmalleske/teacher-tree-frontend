import React, { useState, useEffect, useContext } from 'react';
import { List, Form, Input, Button, message, Select, Tabs, Card, Switch } from 'antd';
import axios from 'axios';
import Product from './product';
import { UserContext } from "../contexts/UserContext";
import useProducts from '../hooks/useProducts';
import useSchools from '../hooks/useSchools';
import Link from "next/link"
import { CaretRightOutlined } from '@ant-design/icons';
import SwitchUploader from './SwitchUploader';

const ProductUploader = ({ school }) => {
    const [form] = Form.useForm();
    const { user } = useContext(UserContext);
    const [listType, setListType] = useState('wishlist');

    const {
        products,
        fetchProducts,
        uploadAmazonProduct,
        uploadManualProduct,
        fetchingProducts,
        uploadingProduct,
    // } = useProducts({ userId: user?.userId });
} = useProducts({ userId: "654ef93e93224d3f27cc87b4" });

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

    const tabItems = [
        {
            label: 'Wishlist',
            key: 'wishlist',
            children: [
                <SwitchUploader
                    key="uploader"
                    form={form}
                    listType={"wishlist"}
                    onSubmitAmazonProduct={onSubmitAmazonProduct}
                    onSubmitManualProduct={onSubmitManualProduct}
                    uploadingProduct={uploadingProduct}
                />,
                <WishList key="wishlist" />
            ],
        },
        {
            label: 'Consumables',
            key: 'consumables',
            children: [
                <SwitchUploader
                    key="uploader"
                    form={form}
                    listType={"consumables"}
                    onSubmitAmazonProduct={onSubmitAmazonProduct}
                    onSubmitManualProduct={onSubmitManualProduct}
                    uploadingProduct={uploadingProduct}
                />,
                <Consumables key="consumables" />
            ]
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
                <SwitchUploader
                    key="uploader"
                    form={form}
                    school={school}
                    listType={"schoolList"}
                    onSubmitAmazonProduct={onSubmitAmazonProduct}
                    onSubmitManualProduct={onSubmitManualProduct}
                    uploadingProduct={uploadingProduct}
                />,
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
