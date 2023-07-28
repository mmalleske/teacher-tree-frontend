// next-auth.js
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: 'Credentials',
      credentials: {
        // The names of the input fields for email and password
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // The authorize function handles authentication with credentials
      authorize: async (credentials) => {
        try {
          // Make a POST request to your backend login route with credentials
          console.log("URL ", process.env.API_BASE_URL)
          const res = await fetch(`${process.env.API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          const data = await res.json();
          
          // If the response status is 200, return the user object
          if (res.ok && data) {
            return Promise.resolve(data);
          }

          // If the response status is not 200, return null
          return Promise.resolve(null);
        } catch (error) {
          // Handle any errors during the login request
          console.error('Login error:', error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  // Other configurations if needed...
});
