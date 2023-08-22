import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react';
import Layout from "../../components/layout";
import ProductUploader from "../../components/productUploader";

export default function Favorites() {
    const [donor, setDonor ] = useState(null);
    const { data: session } = useSession();
    console.log(session, "SESS")
    
    return (
        <Layout>                   
            <h3>Teacher Dashboard</h3>  
            <ProductUploader />          
        </Layout>
    )
}