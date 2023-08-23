import React, { useState } from 'react';
import { Input } from 'antd';
import axios from 'axios'; // Import axios for API requests

const { Search } = Input;

const SchoolSearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [autocompleteResults, setAutocompleteResults] = useState([]);

    const handleSearch = async (value) => {
        setSearchValue(value);  
        const yelpApiBaseUrl = `${process.env.API_BASE_URL}/yelp-api`;
        if (value) {
            try {
                const response = await axios.get(
                    `${yelpApiBaseUrl}/v3/businesses/search?term=${value}&limit=15&location=austin`
                );

                setAutocompleteResults(response.data.businesses);
            } catch (error) {
                console.error('Error fetching autocomplete results:', error);
            }
        } else {
            setAutocompleteResults([]);
        }
    };

    return (
        <Search
            placeholder="Search for a school"
            onSearch={handleSearch}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            enterButton
        />
    );
};

export default SchoolSearchBar;
