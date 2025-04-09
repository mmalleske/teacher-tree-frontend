import { useState } from "react";
import { List, Space, Button, Modal, Input, Avatar } from "antd";
import axios from 'axios';
import { DeleteOutlined, GiftOutlined } from "@ant-design/icons";
import styles from "./product.module.scss"

const Product = ({ product, onProductUpdate, onProductDelete, fetchProducts, readOnly = false, schoolListView = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedQuantity, setEditedQuantity] = useState(product.quantity);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [purchaseQuantity, setPurchaseQuantity] = useState(1); // State to store purchase quantity

    const { imageUrl, affiliateLink, title, quantity = 1 } = product;

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        if (editedQuantity !== product.quantity) {
            try {
                await axios.patch(`${process.env.API_BASE_URL}/products/${product._id}`, { quantity: editedQuantity });
                onProductUpdate(product._id, editedQuantity);
            } catch (error) {
                console.error('Error updating product:', error);
            } finally {
                fetchProducts()
            }
        }
        setIsEditing(false);
    };

    const handleDeleteClick = async () => {
        try {
            await axios.delete(`${process.env.API_BASE_URL}/products/${product._id}`);
            onProductDelete(product._id);
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            fetchProducts()
        }
    };

    const handleUpdatePurchasedAmount = () => {
        setShowModal(true); // Show the modal
    };

    const handleModalOk = async () => {
        try {
            // Parse purchaseQuantity as an integer
            const parsedPurchaseQuantity = parseInt(purchaseQuantity);
            if (isNaN(parsedPurchaseQuantity)) {
                throw new Error('Invalid quantity');
            }

            // Update quantityPurchased by adding parsedPurchaseQuantity to the existing value
            const newQuantityPurchased = (product.quantityPurchased || 0) + parsedPurchaseQuantity;

            // Send PATCH request to update quantityPurchased
            await axios.patch(`${process.env.API_BASE_URL}/products/${product._id}`, { quantityPurchased: newQuantityPurchased });
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            setShowModal(false); // Close the modal
            fetchProducts(); // Refresh product list
        }
    }

    const handleModalCancel = () => {
        setShowModal(false); // Close the modal without updating
    }

    return (
        <List.Item className={styles.productItem}>
            <div className={styles.productItemInfo}>
                <a target="_blank" href={product.affiliateLink}>
                    {product.imageUrl ? <img src={product.imageUrl} /> : <Avatar icon={<GiftOutlined />}/>}
                    <p>{' '}{product.title}</p>
                </a>
                {/* DEMO ONLY */}
                {schoolListView && product.gradeLevel && <p><strong>Grade Level: </strong>{product.gradeLevel}</p>}
                {schoolListView && product.teacherData && <p><strong>Added by: </strong>{`${product.teacherData.firstName} ${product.teacherData.lastName}`}</p>}
            </div>
            <div className={styles.productItemQuantity}>
                {
                    isEditing && !readOnly ? (
                        <div className={styles.productItemQuantityEdit}>
                            <p>Quantity: </p>
                            <Input
                                type="number"
                                value={editedQuantity}
                                onChange={(e) => setEditedQuantity(e.target.value)}
                            />
                        </div>
                    ) : (
                        <>
                            <p>Quantity: {quantity}</p>
                            {!!product.quantityPurchased && product.quantityPurchased > 0 && (<p><i>{product.quantityPurchased} of these items have been purchased.</i></p>)}
                        </>
                    )
                }
            </div>
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
            {/* Modal for updating purchased quantity */}
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

export default Product;
