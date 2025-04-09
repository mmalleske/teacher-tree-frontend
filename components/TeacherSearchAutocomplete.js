import React, { useState, useCallback } from 'react';
import { AutoComplete, Input, Button, Divider, List } from 'antd';
import { stateCodes } from '../constants';
import useTeacherSearch from '../hooks/useTeacherSearch';
import TeacherListItem from '../components/teacherListItem';
import MemberListItem from './memberListItem';
import { debounce, throttle } from 'lodash';

const TeacherSearchAutoComplete = ({ donor, school, listType }) => {
  const { loading, error, results, searchTeachers, searchSuggestions } = useTeacherSearch();
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (value) => {
      if (value) {
        const response = await searchSuggestions({ searchText: value });
  
        const fetchedSuggestions = response?.map((teacher) => ({
          value: teacher.firstName + ' ' + teacher.lastName,
          teacher,
        }));
        setSuggestions(fetchedSuggestions);
      } else {
        setSuggestions([]);
      }
    }, 1000),
    [] // make sure to memoize this only once
  );
  
  const handleSearch = (value) => {
    setSearchText(value);    // update input immediately
    debouncedSearch(value);  // call API after user stops typing
  };

  // const throttledSearch = useCallback(
  //   throttle(async (value) => {
  //     setSearchText(value);
  
  //     if (value) {
  //       const response = await searchSuggestions({ searchText: value });
  
  //       const fetchedSuggestions = response?.map((teacher) => ({
  //         value: teacher.firstName + ' ' + teacher.lastName,
  //         teacher,
  //       }));
  //       setSuggestions(fetchedSuggestions);
  //     } else {
  //       setSuggestions([]);
  //     }
  //   }, 1000), // fires at most once every 1 second
  //   []
  // );

  // const handleSearch = (value) => {
  //   throttledSearch(value);
  // };

  const handleSelect = (value) => {
    // Trigger search with the selected value (if needed)
    searchTeachers({ searchText: value });
  };

  return (
    <>
      <div>
        <h1>Search School Staff Members</h1>
      </div>
      <Divider />
      <AutoComplete
        style={{ width: '100%' }}
        value={searchText}
        onSearch={handleSearch}
        // onSelect={handleSelect}
        placeholder="Search by name, state, school, district, or grade level"
      >
        {suggestions?.map((suggestion) => (
          <AutoComplete.Option key={suggestion.value} value={suggestion.value}>
            {/* Pass the full teacher object */}
            <MemberListItem teacher={suggestion.teacher} school={school} fetchTeachers={searchTeachers} />
          </AutoComplete.Option>
        ))}
        <Input />
      </AutoComplete>
      <Button type="primary" onClick={() => searchTeachers({ searchText })} loading={loading}>
        {loading ? 'Searching...' : 'Search'}
      </Button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <Divider />
      {results && !!results.length && (
        <List
          itemLayout="horizontal"
          size='small'
          dataSource={results}
          renderItem={(teacher) => (
            listType === 'donor' ? (
              <TeacherListItem teacher={teacher} donor={donor} fetchTeachers={searchTeachers} />
            ) : (
              <MemberListItem teacher={teacher} school={school} fetchTeachers={searchTeachers} />
            )
          )}
        />
      )}
    </>
  );
};

export default TeacherSearchAutoComplete;
