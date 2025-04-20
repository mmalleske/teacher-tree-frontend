import React, { useState, useEffect, useContext } from 'react';
import { List, Form, Input, Button, message, Select, Modal, Card, Col, Row, Divider, Switch } from 'antd';
import axios from 'axios';
import Product from './product';
import { UserContext } from "../contexts/UserContext";
import useProducts from '../hooks/useProducts';
const { Option } = Select;

const SwitchUploader = ({ school, listType, onSubmitAmazonProduct, onSubmitManualProduct, uploadingProduct }) => {
  const [form] = Form.useForm();
  const [usingManualEntry, setUsingManualEntry] = useState(false);

  const validateAmazonLink = (rule, value) => {
    if (!value.includes('amazon.com')) {
      return Promise.reject('Please provide a valid Amazon link');
    }
    return Promise.resolve();
  };

  const AmazonUploader = () => (
    <Form form={form} onFinish={onSubmitAmazonProduct}>
      <Form.Item
        name="amazonLink"
        rules={[
          { required: true, message: 'Please enter an Amazon link' },
          { validator: validateAmazonLink },
        ]}
      >
        <Input placeholder="Amazon Link" />
      </Form.Item>
      <Form.Item name="quantity">
        <Input placeholder='Quantity' type='number' defaultValue={1} />
      </Form.Item>
      {school && listType === "schoolList" && (
        <Form.Item name="gradeLevel" label="Grade Level" rules={[{ required: true, message: 'Please select a grade level' }]}>
          <Select placeholder="Select grade level">
            {school?.gradeLevels?.map((grade) => (
              <Option key={grade} value={grade}>
                {grade}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={uploadingProduct}>
          Add Product
        </Button>
      </Form.Item>
    </Form>
  )

  const ManualUploader = () => (
    <Form form={form} onFinish={onSubmitManualProduct}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Please enter a product title' }]}
      >
        <Input placeholder="Product Title" />
      </Form.Item>
      <Form.Item
        name="imageUrl"        
      >
        <Input placeholder="Image URL" />
      </Form.Item>
      <Form.Item name="description">
        <Input.TextArea placeholder="Product Description (optional)" />
      </Form.Item>
      <Form.Item name="altLink">
        <Input placeholder="Alternate Link (optional)" />
      </Form.Item>
      <Form.Item name="quantity">
        <Input placeholder="Quantity" type="number" defaultValue={1} />
      </Form.Item>
      {school && listType === "schoolList" && (
        <Form.Item name="gradeLevel" label="Grade Level" rules={[{ required: true, message: 'Please select a grade level' }]}>
          <Select placeholder="Select grade level">
            {school?.gradeLevels?.map((grade) => (
              <Option key={grade} value={grade}>
                {grade}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={uploadingProduct}>
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );

  const EntrySwitch = () => (
    <div style={{ marginBottom: 16 }}>
      <p strong>Don't have an Amazon product? Enter the product manually.</p>
      <div>
        <Switch
          label={usingManualEntry ? "Manual Entry" : "Using Amazon Link Entry"}
          checked={usingManualEntry}
          onChange={(checked) => setUsingManualEntry(checked)}
          style={{ marginLeft: 8 }}
        />
        <div>
          <sub>{usingManualEntry ? "Switch to Amazon Link" : "Switch to Manual Entry"}</sub>
        </div>
      </div>
    </div>
  )

  const Uploader = () => (
    <>
      <EntrySwitch />
      {usingManualEntry ? <ManualUploader /> : <AmazonUploader />}
    </>
  );

  return <Uploader />

}

export default SwitchUploader;