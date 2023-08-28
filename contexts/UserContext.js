import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { decode } from 'jsonwebtoken';
import { useRouter } from 'next/router';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('authToken'); // Retrieve the token using js-cookie

        if (!token) {
            router.push('/login'); // Redirect to login if token is not present
            return;
        }

        try {
            const decodedToken = decode(token);
            console.log(decodedToken, 'decoded');
            setUser(decodedToken);
        } catch (error) {
            console.error('Error decoding token:', error);
            router.push('/login'); // Redirect to login if token is invalid
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
