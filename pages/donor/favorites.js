import { useEffect, useState } from "react"
import axios from "axios";
import authOptions from "../api/auth/authConfig";
import { useSession } from 'next-auth/react';

// export async function getServerSideProps(context) {
//      const { data: session } = useSession();
    
//     console.log(session, "SESS")
//     // if (!session) {
//     //   return {
//     //     redirect: {
//     //       destination: '/',
//     //       permanent: false,
//     //     },
//     //   };
//     // }
  
//     return {
//       props: {
//         session,
//       },
//     };
//   }

export default function Favorites() {
    const [studentParent, setStudentParent] = useState(null);
    const { data: session } = useSession();
    console.log(session, "SESS")
    // useEffect(() => {
    //     // Log the session
    //     console.log('Session:', session);
    //   }, [session]);
    return (
        <div>                   
            <h3>Favorite Teachers</h3>
            <p>You currently have no teachers favorited</p>
        </div>
    )
}