import { useState } from "react";
import { List, Space, Button, Input } from "antd";
import axios from 'axios';
import { DeleteOutlined } from "@ant-design/icons";
import styles from "./product.module.scss"

const Product = ({ product, onProductUpdate, onProductDelete, fetchProducts, readOnly = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedQuantity, setEditedQuantity] = useState(product.quantity);
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

    return (
        <List.Item className={styles.productItem}>
            <div className={styles.productItemInfo}>
                <a target="_blank" href={product.affiliateLink}>
                    <img src={product.imageUrl} />
                    <p>{product.title}</p>
                </a>
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
                        <p>Quantity: {quantity}</p>
                    )
                }
            </div>
            {!readOnly && (
                <div className={styles.productItemActions}>
                    {!isEditing ? (
                        <Space>
                            <Button key="edit" onClick={handleEditClick}>Edit</Button>
                            <Button key="delete" onClick={handleDeleteClick}><DeleteOutlined /></Button>
                        </Space>
                    ) : (
                        <Space>
                            <Button key="save" onClick={handleSaveClick}>Save</Button>
                            <Button key="cancel" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </Space>
                    )}
                </div>
            )}
        </List.Item>
    );
};

export default Product;
