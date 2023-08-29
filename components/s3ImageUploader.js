import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import { Button, Avatar, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const S3ImageUploader = ({ onUpload, teacherProfile }) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  const handleFileUpload = async () => {
    if (!file) {
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

      // Delete the old photo if a new one is being uploaded
      if (teacherProfile.profilePhotoUrl && teacherProfile.profilePhotoUrl !== '') {
        const oldPhotoKey = teacherProfile.profilePhotoUrl.split('/').pop();
        await s3.deleteObject({
          Bucket: 'teacher-tree',
          Key: oldPhotoKey,
        }).promise();
      }

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

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  return (
    <div>
      {file ? (
        <Avatar shape="square" size={200} src={URL.createObjectURL(file)} />
      ) : (
        <Avatar shape="square" size={200} src={teacherProfile.profilePhotoUrl} />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(event) => handleFileChange(event.target.files[0])}
        capture
      />

      {/* <Button
        icon={<UploadOutlined />}
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        Select Image
      </Button> */}
    </div>
  );
};

export default S3ImageUploader;
