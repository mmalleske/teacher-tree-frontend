import React, { useState, useEffect, useContext } from 'react';
import { Select, Input, Button, List, Avatar, Card, Divider } from 'antd';
import axios from 'axios';
import { stateCodes } from '../../constants';
import Layout from "../../components/layout";
import { CaretLeftOutlined } from '@ant-design/icons';
import TeacherListItem from '../../components/teacherListItem';
import { UserContext } from '../../contexts/UserContext';

const TeacherSearch = () => {
  const [state, setState] = useState('');
  const [schoolDistrict, setSchoolDistrict] = useState('');
  const [school, setSchool] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [donor, setDonor] = useState(null); // State to store donor information
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

  const getOrdinal = (number) => {
    if (typeof number !== 'number') {
      throw new Error('Input must be a number');
    }

    if (number % 100 >= 11 && number % 100 <= 13) {
      return number + 'th';
    }

    switch (number % 10) {
      case 1:
        return number + 'st';
      case 2:
        return number + 'nd';
      case 3:
        return number + 'rd';
      default:
        return number + 'th';
    }
  }

  return (
    <Layout>
      <Card>
        <div>
          <Button type="primary" href="/donor/favorites"><CaretLeftOutlined /> Back to Favorites</Button>
          <h1>Search Teachers/Staff</h1>
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
            <Select.Option key={'early-childhood'} value="Early Childhood">
              Early Childhood
            </Select.Option>
            <Select.Option key={'pre-k'} value="Pre-K">
              Pre-K
            </Select.Option>
            <Select.Option key={'kindergarten'} value="Kindergarten">
              Kindergarten
            </Select.Option>
            {[...Array(12)].map((_, index) => (
              <Select.Option key={index + 1} value={getOrdinal(index + 1)}>
                {getOrdinal(index + 1)}
              </Select.Option>
            ))}
            <Select.Option key={'other'} value="Other">
              Other Staff
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleSearch} disabled={missingFields}>
            Search
          </Button>
        </>
        <Divider />
        {donor && (
          <List
            itemLayout="horizontal"
            dataSource={teachers}
            renderItem={(teacher) => (
              <TeacherListItem teacher={teacher} donor={donor} fetchTeachers={handleSearch} />
            )}
          />
        )}
      </Card>
    </Layout>
  );
};

export default TeacherSearch;
