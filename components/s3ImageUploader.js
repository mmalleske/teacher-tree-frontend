import React, { useState } from 'react';
import AWS from 'aws-sdk';
import { Upload, Button, Avatar, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const S3ImageUploader = ({ onUpload, teacherProfile }) => {
  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    console.log(teacherProfile.profilePhotoUrl)
    if (!file) {
      message.error('Please select an image before uploading.');
      return;
    }

    try {
      // Initialize AWS SDK with your credentials
      AWS.config.update({
        region: 'us-east-2',
        credentials: new AWS.Credentials(
          process.env.S3_ACCESS_KEY,
          process.env.S3_SECRET_KEY
        ), 
      });

      const s3 = new AWS.S3();

      // Upload the selected image to S3
      const params = {
        Bucket: 'teacher-tree',
        Key: file.name,
        Body: file,
        ACL: 'public-read', // Make the uploaded image publicly accessible
      };

      const result = await s3.upload(params).promise();
      onUpload(result.Location); // Pass the S3 image URL back to the parent component
      message.success('Image uploaded successfully!');
    } catch (error) {
      message.error('Error uploading image to S3.');
      console.error('Error uploading image to S3:', error);
    }
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  return (
    <div>
      {file ? (
        <Avatar shape="square" size={100} src={URL.createObjectURL(file)} />
      ) : (
        <Avatar shape="square" size={100} src={teacherProfile.profilePhotoUrl} />
      )}

      <Upload
        showUploadList={false}
        customRequest={() => {}}
        beforeUpload={(file) => {
          handleFileChange(file);
          return false; // Prevent default upload behavior
        }}
      >
        <Button icon={<UploadOutlined />}>Select Image</Button>
      </Upload>

      {file && (
        <Button type="primary" onClick={handleFileUpload}>
          Upload to S3
        </Button>
      )}
    </div>
  );
};

export default S3ImageUploader;
