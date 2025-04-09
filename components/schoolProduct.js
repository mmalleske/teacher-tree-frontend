import { useState } from "react";
import { List, Space, Button, Modal, Input, Avatar, Select } from "antd";
import axios from 'axios';
import { DeleteOutlined, GiftOutlined } from "@ant-design/icons";
import styles from "./product.module.scss";

const { Option } = Select;

const SchoolProduct = ({ product, onProductUpdate, onProductDelete, fetchProducts, readOnly = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({ ...product });
    const [showModal, setShowModal] = useState(false);
    const [purchaseQuantity, setPurchaseQuantity] = useState(1);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            await axios.patch(`${process.env.API_BASE_URL}/school-products/${product._id}`, editedProduct);
            onProductUpdate(product._id, editedProduct);
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            fetchProducts();
            setIsEditing(false);
        }
    };

    const handleDeleteClick = async () => {
        try {
            await axios.delete(`${process.env.API_BASE_URL}/school-products/${product._id}`);
            onProductDelete(product._id);
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            fetchProducts();
        }
    };

    const handleUpdatePurchasedAmount = () => {
        setShowModal(true);
    };

    const handleModalOk = async () => {
        try {
            const parsedPurchaseQuantity = parseInt(purchaseQuantity);
            if (isNaN(parsedPurchaseQuantity)) {
                throw new Error('Invalid quantity');
            }

            const newQuantityPurchased = (product.quantityPurchased || 0) + parsedPurchaseQuantity;

            await axios.patch(`${process.env.API_BASE_URL}/school-products/${product._id}`, { quantityPurchased: newQuantityPurchased });
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            setShowModal(false);
            fetchProducts();
        }
    };

    const handleModalCancel = () => {
        setShowModal(false);
    };

    return (
        <List.Item className={styles.productItem}>
            <div className={styles.productItemInfo}>
                {product.affiliateLink ? (
                    <a target="_blank" rel="noopener noreferrer" href={product.affiliateLink}>
                        {product.imageUrl ? <img src={product.imageUrl} alt={product.title} /> : <Avatar icon={<GiftOutlined />} />}
                        <p>{' '}{product.title}</p>
                    </a>
                ) : (
                    <>
                        <Avatar icon={<GiftOutlined />} />
                        <p>{' '}{product.title}</p>
                    </>
                )}
                {product.gradeLevel && <p><strong>Grade Level: </strong>{product.gradeLevel}</p>}
                {product.description && <p><strong>Description: </strong>{product.description}</p>}
                {product.altLink && <p><strong>Alternative Link: </strong><a href={product.altLink} target="_blank" rel="noopener noreferrer">View</a></p>}
            </div>
            
            <div className={styles.productItemQuantity}>
                {isEditing && !readOnly ? (
                    <div className={styles.productItemQuantityEdit}>
                        <p>Quantity: </p>
                        <Input
                            type="number"
                            value={editedProduct.quantity}
                            onChange={(e) => setEditedProduct({ ...editedProduct, quantity: e.target.value })}
                        />
                    </div>
                ) : (
                    <>
                        <p>Quantity: {product.quantity}</p>
                        {product.quantityPurchased > 0 && <p><i>{product.quantityPurchased} of these items have been purchased.</i></p>}
                    </>
                )}
            </div>

            {isEditing && !readOnly && (
                <div className={styles.productItemEditFields}>
                    <Input
                        placeholder="Title"
                        value={editedProduct.title}
                        onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
                    />
                    <Input.TextArea
                        placeholder="Description"
                        value={editedProduct.description}
                        onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                    />
                    <Input
                        placeholder="Alternative Link"
                        value={editedProduct.altLink}
                        onChange={(e) => setEditedProduct({ ...editedProduct, altLink: e.target.value })}
                    />
                    <Select
                        placeholder="Grade Level"
                        value={editedProduct.gradeLevel}
                        onChange={(value) => setEditedProduct({ ...editedProduct, gradeLevel: value })}
                    >
                        <Option value="K">Kindergarten</Option>
                        <Option value="1">1st Grade</Option>
                        <Option value="2">2nd Grade</Option>
                        <Option value="3">3rd Grade</Option>
                        <Option value="4">4th Grade</Option>
                        <Option value="5">5th Grade</Option>
                    </Select>
                </div>
            )}

            {readOnly && (
                <Button onClick={handleUpdatePurchasedAmount} type="primary">I've purchased this item.</Button>
            )}
            
            {!readOnly && (
                <div className={styles.productItemActions}>
                    {!isEditing ? (
                        <Space>
                            <Button key="edit" onClick={handleEditClick}>Edit</Button>
                            <Button type="dashed" key="delete" onClick={handleDeleteClick}><DeleteOutlined /></Button>
                        </Space>
                    ) : (
                        <Space>
                            <Button type="primary" key="save" onClick={handleSaveClick}>Save</Button>
                            <Button key="cancel" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </Space>
                    )}
                </div>
            )}

            <Modal
                title="Update Purchased Quantity"
                open={showModal}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <p>Please enter the quantity you have purchased:</p>
                <Input
                    min={0}
                    type="number"
                    value={purchaseQuantity}
                    onChange={(e) => setPurchaseQuantity(e.target.value)}
                />
            </Modal>
        </List.Item>
    );
};

export default SchoolProduct;
