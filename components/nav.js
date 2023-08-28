import { useContext } from "react";
import { Button } from "antd";
import styles from "./nav.module.scss";
import { UserContext } from "../contexts/UserContext";
import useCustomLogin from "../hooks/useCustomLogin";

export default function Nav() {
  // Use the UserContext to access the user data
  const { user } = useContext(UserContext);
  const { logout } = useCustomLogin();

  return (
    <div className={styles.nav}>
      {user && (
        <>
          <p>Logged in as {user.email}</p>
          <Button onClick={logout}>Logout</Button>
        </>
      )}
    </div>
  );
}
