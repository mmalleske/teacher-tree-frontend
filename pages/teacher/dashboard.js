import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react';

export default function Favorites() {
    const [donor, setDonor ] = useState(null);
    const { data: session } = useSession();
    console.log(session, "SESS")
    
    return (
        <div>                   
            <h3>Teacher Dashboard</h3>            
        </div>
    )
}