import { useContext } from "react";
import { Button } from "antd";
import styles from "./nav.module.scss";
import { UserContext } from "../contexts/UserContext";

export default function Nav() {
  // Use the UserContext to access the user data
  const { user } = useContext(UserContext);

  return (
    <div className={styles.nav}>
      {user && (
        <>
          <p>Logged in as {user.email}</p>
          <Button onClick={() => handleLogout()}>Logout</Button>
        </>
      )}
    </div>
  );
}
