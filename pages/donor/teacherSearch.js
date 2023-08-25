import React, { useState } from 'react';
import { Select, Input, Button, List, Avatar } from 'antd';
import axios from 'axios';
import { stateCodes } from '../../constants';
import Layout from "../../components/layout";

const { Option } = Select;

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
      <h1>Search Teachers</h1>
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
      {/* {state && ( */}
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
      {/* )} */}
      <List
        itemLayout="horizontal"
        dataSource={teachers}
        renderItem={(teacher) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size={100} src={teacher.profilePhotoUrl} />}
              title={`${teacher.firstName} ${teacher.lastName}`}
              description={teacher.schoolName}
            />
          </List.Item>
        )}
      />
    </Layout>
  );
};

export default TeacherSearch;
