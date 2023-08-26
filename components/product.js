import { useState } from "react";
import { List, Avatar, Button, Input } from "antd";
import axios from 'axios';
import { DeleteOutlined } from "@ant-design/icons";

const Product = ({ product, onProductUpdate, onProductDelete, fetchProducts }) => {
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
        <List.Item
            actions={!isEditing ? [
                <Button onClick={handleEditClick}>Edit</Button>,
                <Button onClick={handleDeleteClick}><DeleteOutlined /></Button>
            ] : [
                <Button onClick={handleSaveClick}>Save</Button>,
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            ]}
        >
            <List.Item.Meta
                avatar={<a target="_blank" href={affiliateLink}><img src={imageUrl} /></a>}
                title={<p><a target="_blank" href={affiliateLink}>{title}</a></p>}
                description={
                    isEditing ? (
                        <Input
                            type="number"
                            value={editedQuantity}
                            onChange={(e) => setEditedQuantity(e.target.value)}
                        />
                    ) : (
                        <p>Quantity: {quantity}</p>
                    )
                }
            />
        </List.Item>
    );
};

export default Product;
