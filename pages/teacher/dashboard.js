import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react';
// import Layout from "../../components/layout";
import ProductUploader from "../../components/productUploader";
import { getSession } from "next-auth/react";
import ProfileSideBar from "../../components/profileSideBar";
import { Layout } from "antd";

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

export default function Favorites() {
    const [donor, setDonor ] = useState(null);
    const { data: session } = useSession();
    
    return (
        <Layout>                 
            <h3>Teacher Dashboard</h3>            
            <ProductUploader />          
        </Layout>
    )
}