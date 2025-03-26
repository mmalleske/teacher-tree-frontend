import { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Space } from "antd";
import styles from "./nav.module.scss";
import { UserContext } from "../contexts/UserContext";
import useCustomLogin from "../hooks/useCustomLogin";
import {
  ProfileOutlined,
  DashboardOutlined,
  MenuOutlined,
  LogoutOutlined,
  SearchOutlined,
  HeartOutlined,
  RedoOutlined
} from '@ant-design/icons';
import Link from "next/link";

export default function Nav() {
  const { user } = useContext(UserContext);
  const { logout } = useCustomLogin();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (window) {
      const currentPathname = window.location.pathname;
      const isDonorPage = currentPathname.startsWith('/donor');
      const isTeacherPage = currentPathname.startsWith('/teacher');

      if (isDonorPage) {
        setCurrentPath('donor')
      }

      if (isTeacherPage) {
        setCurrentPath('teacher')
      }
    }

  }, [])

  const items = currentPath === 'teacher' ? [
    {
      key: 'dashboard',
      label: (
        <Link href="/teacher/dashboard"><DashboardOutlined /> School Staff Member Dashboard</Link>
      ),
    },
    {
      key: 'profile',
      label: (
        <Link href="/teacher/profile"><ProfileOutlined /> School Staff Member Profile</Link>
      ),
    },
    {
      key: 'switch-to-donor',
      label: (
        <Link href="/donor/favorites"><RedoOutlined /> Switch to Helper Profile</Link>
      ),
    },
    {
      key: 'logout',
      label: (<Button block onClick={logout}><LogoutOutlined /> Logout</Button>),
    },
  ] : [
    {
      key: 'favorites',
      label: (
        <Link href="/donor/favorites"><HeartOutlined /> Favorite School Staff Members</Link>
      ),
    },
    {
      key: 'teacher-search',
      label: (
        <Link href="/donor/teacherSearch"><SearchOutlined /> Search School Staff Members</Link>
      ),
    },
    {
      key: 'switch-to-teacher',
      label: (
        <Link href="/teacher/dashboard"><RedoOutlined /> Switch to School Staff Member Profile</Link>
      ),
    },
    {
      key: 'logout',
      label: (<Button block onClick={logout}><LogoutOutlined /> Logout</Button>),
    },
  ];

  return (
    <div className={styles.nav}>
      {user ? (
        <>
          <p>Logged in as {user.email}</p>
          <Dropdown
            menu={{ items }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <MenuOutlined />
            </a>
          </Dropdown>
        </>
      ) : (
        <>
        <Space>
          <Link href="/login">Login</Link>
          <Link href="/register">Sign Up</Link>
        </Space>
        </>
      )}
    </div>
  );
}
