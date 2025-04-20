import { useState, useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';

const useProducts = ({ userId, schoolId, fetchSchoolList }) => {
    const [products, setProducts] = useState([]);
    const [fetchingProducts, setFetchingProducts] = useState(false);
    const [uploadingProduct, setUploadingProduct] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        if (!userId && !schoolId) return;

        setFetchingProducts(true);
        setError(null);

        try {
            let url;
            if (fetchSchoolList && schoolId) {
                url = `${process.env.API_BASE_URL}/products/school/${schoolId}`;
            } else if (userId) {
                url = `${process.env.API_BASE_URL}/products/user/${userId}`;
            }

            const response = await axios.get(url);
            setProducts(response.data);
        } catch (err) {
            setError(err.message || 'Failed to fetch products');
        } finally {
            setFetchingProducts(false);
        }
    };

    const uploadAmazonProduct = async ({ values, listType, schoolId }) => {
        if (userId) {
            setUploadingProduct(true)
            try {
                message.info('Please be patient while we talk to Amazon.')
                const response = await axios.post(`${process.env.API_BASE_URL}/products/new`, {
                    userId,
                    url: values.amazonLink,
                    quantity: values.quantity,
                    listType,
                    // optional
                    gradeLevel: values.gradeLevel,
                    schoolId, //optional
                });

                if (response.data) {
                    message.success('Product added successfully');
                    setUploadingProduct(false)
                }
            } catch (error) {
                console.error('Error adding product:', error);
                setUploadingProduct(false)
            }
        }
    }
    const uploadManualProduct = async ({ values, listType, schoolId }) => {
        console.log(userId, "user")
        if (userId) {
            setUploadingProduct(true);
            try {
                await axios.post(`${process.env.API_BASE_URL}/products/new`, {
                    ...values,
                    userId,
                    listType,
                    schoolId,
                });
                message.success('Product added');                
            } catch (err) {
                message.error('Something went wrong');
                console.error(err);
            } finally {
                setUploadingProduct(false);
            }
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [userId, schoolId]);

    return { products, fetchingProducts, uploadingProduct, error, fetchProducts, uploadAmazonProduct, uploadManualProduct };
};

export default useProducts;
