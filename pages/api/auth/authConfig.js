import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
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
          const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          const user = await res.json();

          console.log(user, "USER")

          if (res.ok && user) {
            // Return the user data
            // return Promise.resolve(user);
            return user
          }

          // return Promise.resolve(null);
          return null
        } catch (error) {
          // Handle any errors during the login request
          console.error('Login error:', error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = {
        "_id": token.user._id,
        "email": token.user.email
      } // Update session.user with the entire token object
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token = user; // Update the token with the entire user object
      }
      return token;
    },
  },
  // Other configurations if needed...
};

export default authOptions;
