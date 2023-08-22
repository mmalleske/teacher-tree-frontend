import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
          Authorization: process.env.IMGUR_CLIENT_ID, // Replace with your Imgur Client ID
        },
      });

      setImageUrl(response.data.data.link);
      message.success('Image uploaded successfully');
    } catch (error) {
      console.error('Image upload error:', error);
      message.error('An error occurred while uploading the image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Upload
        customRequest={({ file }) => handleUpload(file)}
        showUploadList={false}
        accept="image/*"
      >
        <Button icon={<UploadOutlined />} loading={loading}>
          Upload Image
        </Button>
      </Upload>
      {imageUrl && (
        <div style={{ marginTop: '16px' }}>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
