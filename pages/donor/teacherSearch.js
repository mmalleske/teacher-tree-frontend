import React, { useState, useEffect, useContext } from 'react';
import { Card, Button } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import Layout from "../../components/layout";
import { UserContext } from '../../contexts/UserContext';
import TeacherSearch from '../../components/teacherSearch';

const TeacherSearchPage = () => {
  const [donor, setDonor] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {

    const fetchDonor = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASE_URL}/donors/${user.userId}`);
        setDonor(response.data); // Set donor information
      } catch (error) {
        console.error('Error fetching donor:', error);
      }
    };

    if (user?.userId) {
      fetchDonor();
    }
  }, [user]);

  return (
    <Layout>
      <Card>
        <Button type="primary" href="/donor/favorites">
          <CaretLeftOutlined /> Back to Favorites
        </Button>
        {donor && <TeacherSearch donor={donor} listType='donor' />}
      </Card>
    </Layout>
  );
};

export default TeacherSearchPage;
