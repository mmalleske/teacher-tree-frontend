import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from "./profileSideBar.module.scss";

const ProfileSideBar = ({ teacherProfile }) => {

    console.log(teacherProfile)

    const {
        firstName,
        lastName,
        birthdate,
        profilePhotoUrl,
        interests,
        favoriteThings,
    } = teacherProfile

    return (
        <div className={styles.profileSideBar}>
            <div className={styles.avatar}>
                {profilePhotoUrl ? (
                    <Avatar size={100} src={profilePhotoUrl} />
                ) : (
                    <Avatar size={100} icon={UserOutlined} />
                )}
                <p>{firstName} {lastName}</p>
            </div>

            <Button block href='/teacher/profile'>Edit Profile</Button>
            <p><b>Birthday:</b> {birthdate}</p>
            <p><b>Interests and Hobbies</b></p>
            <p>{interests}</p>
            <p><b>Favorite Things</b></p>
            <ul>
                {Object.entries(favoriteThings).map(([key, value]) => (
                    <li key={key}><b>{key}:</b> {value}</li>
                ))}
            </ul>
        </div>
    )
}

export default ProfileSideBar;