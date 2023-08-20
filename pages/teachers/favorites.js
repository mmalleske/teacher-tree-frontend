import { useEffect, useState } from "react"
import axios from "axios";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/authConfig";

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
  
    // if (!session) {
    //   return {
    //     redirect: {
    //       destination: '/',
    //       permanent: false,
    //     },
    //   };
    // }
  
    return {
      props: {
        session,
      },
    };
  }

export default function Favorites({session}) {
    const [studentParent, setStudentParent] = useState(null);
    useEffect(() => {
        // Log the session
        console.log('Session:', session);
      }, [session]);
    return (
        <div>                   
            <h3>Favorite Teachers</h3>
            <p>You currently have no teachers favorited</p>
        </div>
    )
}