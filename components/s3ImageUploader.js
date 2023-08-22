import React, { useState } from 'react';
import AWS from 'aws-sdk';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const S3ImageUploader = ({ onUpload }) => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = async (file) => {
    if (!file) return;

    // Initialize AWS SDK with your credentials
    AWS.config.update({
      region: 'us-east-2',
      credentials: new AWS.Credentials('AKIA3AVFFAFTGD5W5WXH', '0bMaXG1mrWeHcWDi/QELRs6eh1uuQFjwstSTnifI')
    });

    const s3 = new AWS.S3();

    // Upload the selected image to S3
    const params = {
      Bucket: 'mm-beareng-test-bucket',
      Key: file.name,
      Body: file,
      ACL: 'public-read' // Make the uploaded image publicly accessible
    };

    try {
      const result = await s3.upload(params).promise();
      onUpload(result.Location); // Pass the S3 image URL back to the parent component
      message.success('Image uploaded successfully!');
    } catch (error) {
      message.error('Error uploading image to S3.');
      console.error('Error uploading image to S3:', error);
    }
  };

  const handleFileUpload = async (file) => {
    try {
        // Configure your S3 bucket settings
        const bucketName = 'teacher-tree';
        const region = 'us-east-2';
        const accessKeyId = "AKIA3AVFFAFTJRQW37HO";
        const secretAccessKey = "PEaba8YUAUjd4/zJdPs7MpLhoJg/M9EMlIDD60Ft";

        // Generate a unique filename for the uploaded photo
        const fileName = `${Date.now()}-${file.name}`;

        // Create an instance of the AWS SDK
        const s3 = new AWS.S3({
            region,
            accessKeyId,
            secretAccessKey,
        });

        // Configure the S3 upload parameters
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: file,
            ACL: 'public-read', // Set the appropriate ACL for your use case
        };

        // Upload the file to S3
        const response = await s3.upload(params).promise();

        // Return the URL of the uploaded file
        onUpload(response.Location)
        return response.Location;
    } catch (error) {
        console.error('Error uploading photo to S3:', error);
        throw new Error('Failed to upload photo to S3');
    }
};

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0 && fileList[0].status === 'done') {
      handleFileUpload(fileList[0].originFileObj);
    }
  };

  const uploadProps = {
    fileList,
    onChange: handleChange,
  };

  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Upload Image</Button>
    </Upload>
  );
};

export default S3ImageUploader;
