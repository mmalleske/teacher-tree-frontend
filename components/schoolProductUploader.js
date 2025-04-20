import React, { useState, useEffect, useContext } from 'react';
import { List, Form, Input, Button, message, Select, Modal, Card, Col, Row, Divider, Switch } from 'antd';
import axios from 'axios';
import Product from './product';
import { UserContext } from "../contexts/UserContext";
import useProducts from '../hooks/useProducts';
import SwitchUploader from './SwitchUploader';

const { Option } = Select;

const SchoolProductUploader = ({ school }) => {
    const [form] = Form.useForm();
    const { user } = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
    const [selectedGradeLevel, setSelectedGradeLevel] = useState(school.gradeLevels[0]); // Filter by grade level
    const [usingManualEntry, setUsingManualEntry] = useState(false);

    const {
        products,
        fetchProducts,
        uploadAmazonProduct,
        uploadManualProduct,
        fetchingProducts,
        uploadingProduct,
    } = useProducts({ userId: user?.userId, schoolId: school._id, fetchSchoolList: true });

    const onSubmitAmazonProduct = async (values) => {
        await uploadAmazonProduct({ values, listType: 'schoolList', schoolId: school._id });
        form.resetFields();
        fetchProducts();
        setIsModalVisible(false); // Close the modal after successful upload
    };

    const onSubmitManualProduct = async (values) => {
        await uploadManualProduct({ values, listType: 'schoolList', schoolId: school._id });
        form.resetFields();
        fetchProducts();
        setIsModalVisible(false); // Close the modal after successful upload
    };

    // Filter products by grade level
    const filteredProducts = products?.filter((product) => product.gradeLevel === selectedGradeLevel);

    const SchoolList = () => (
        <List
            dataSource={[...filteredProducts].reverse()} // Reverse the filtered products array
            renderItem={(product) => (
                <Product product={product} fetchProducts={fetchProducts} schoolListView />
            )}
            locale={{ emptyText: "No products uploaded to this school list yet." }}
        />
    );

    // Function to show modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Function to close modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Row display="flex" alignContent="center">
                {/* Grade level filter */}
                <Col lg={18} xs={24}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                        <h4>Select Grade Level: </h4>
                        <Select
                            style={{ width: 200, marginBottom: '16px' }}
                            value={selectedGradeLevel}
                            onChange={(value) => setSelectedGradeLevel(value)}
                        >
                            {school?.gradeLevels?.map((grade) => (
                                <Option key={grade} value={grade}>
                                    {grade}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </Col>
                {/* Button to open modal */}
                <Col lg={6} xs={24}>
                    <Button style={{ width: "100%" }} type="primary" onClick={showModal}>
                        Add Product
                    </Button>
                </Col>
            </Row>

            <Divider />

            {/* List of products */}
            <h3>{selectedGradeLevel} Grade List:</h3>
            <SchoolList />

            {/* Modal with Uploader inside */}
            <Modal
                title="Upload Product"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} // Disable default modal buttons
                destroyOnClose // Destroy form on close to reset fields
            >
                {/* <Uploader /> */}
                <SwitchUploader
                    form={form}
                    school={school}
                    listType={"schoolList"}
                    onSubmitAmazonProduct={onSubmitAmazonProduct}
                    onSubmitManualProduct={onSubmitManualProduct}
                    uploadingProduct={uploadingProduct}
                />
            </Modal>
        </>
    );
};

export default SchoolProductUploader;
