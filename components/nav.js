import { useSession, signOut } from "next-auth/react";
import { Button } from "antd";

export default function Nav() {
    const { data: session } = useSession();

    return (
        <div>
            {session && session.user && (
                <>
                    <p>Logged in as {session.user.email}</p>
                    <Button onClick={() => signOut({ callbackUrl: '/login' })}>Logout</Button>
                </>
            )}
        </div>
    )
}