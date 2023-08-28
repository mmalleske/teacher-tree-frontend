import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { message } from 'antd';
import Cookies from 'js-cookie';
import { UserContext } from '../contexts/UserContext';

const useCustomLogin = () => {
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const login = async (email, password, userType) => {
    try {
      setLoading(true);

      // Call your login API here
      // Replace this with your actual API call logic
      const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Set the user in context
        setUser(data.user);

        //Save the token to a cookie
        const expirationTime = 3600; // Set the expiration time (e.g., 1 hour)
        Cookies.set('authToken', data.token, { expires: expirationTime });

        if (userType === 'teacher') {
          router.push('/teacher/dashboard');
        } else {
          router.push('/donor/favorites');
        }
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('An error occurred during login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useCustomLogin;
