// next-auth.js
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import authOptions from './authConfig';

export default NextAuth(authOptions);
