import React, { useState } from 'react';
import { Select, Input, Button, List, Avatar, Card, Divider } from 'antd';
import axios from 'axios';
import { stateCodes } from '../../constants';
import Layout from "../../components/layout";
import { getSession } from 'next-auth/react';
import { CaretLeftOutlined } from '@ant-design/icons';
import TeacherListItem from '../../components/teacherListItem';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login', // Redirect to login page
        permanent: false,
      },
    };
  }

  // Continue loading the page normally
  return {
    props: {},
  };
}

const TeacherSearch = () => {
  const [state, setState] = useState('');
  const [schoolDistrict, setSchoolDistrict] = useState('');
  const [school, setSchool] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [teachers, setTeachers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.API_BASE_URL}/teachers/search`, {
        params: { state, schoolDistrict, school, gradeLevel },
      });

      setTeachers(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const missingFields = !state || !school && !schoolDistrict

  return (
    <Layout>
      <Card>
        <div>
          <Button type="primary" href="/donor/favorites"><CaretLeftOutlined /> Back to Favorites</Button>
          <h1>Search Teachers</h1>
          <sub>*Please select a state and enter a school name and/or school district.</sub>
        </div>
        <Divider />
        <Select
          placeholder="Select state"
          style={{ width: 200, marginBottom: 16 }}
          onChange={(value) => setState(value)}
        >
          {stateCodes.map(state => (
            <Select.Option key={state.code} value={state.code}>
              {state.name}
            </Select.Option>
          ))}
        </Select>
        <>
          <Input
            placeholder="School District"
            style={{ marginBottom: 16 }}
            onChange={(e) => setSchoolDistrict(e.target.value)}
          />
          <Input
            required
            placeholder="School Name"
            style={{ marginBottom: 16 }}
            onChange={(e) => setSchool(e.target.value)}
          />
          <Select
            placeholder="Select grade level"
            style={{ width: 200, marginBottom: 16 }}
            onChange={(value) => setGradeLevel(value)}
          >
            {/* Add options for grade levels 1-12 */}
          </Select>
          <Button type="primary" onClick={handleSearch} disabled={missingFields}>
            Search
          </Button>
        </>
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={teachers}
          renderItem={(teacher) => (
            <TeacherListItem teacher={teacher} />
          )}
        />
      </Card>
    </Layout>
  );
};

export default TeacherSearch;
