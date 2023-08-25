import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Avatar, Button, Card } from 'antd';
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
        schoolName,
        schoolDistrict,
        gradeLevels
    } = teacherProfile

    if (!firstName && !lastName && !schoolName && !schoolDistrict) {
        return (
            <div className={styles.profileSideBar}>
                <h4>You haven't completed your teacher profile!</h4>
                <Button block href='/teacher/profile'>Edit Profile</Button>
            </div>
        )
    }

    return (
        <div className={styles.profileSideBar}>
            <Card>
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
                <p><b>Interests and Hobbies:</b></p>
                <p>{interests}</p>
                <p><b>Favorite Things:</b></p>
                {favoriteThings && (
                    <ul>
                        {Object.entries(favoriteThings).map(([key, value]) => (
                            <li key={key}><b>{key}:</b> {value}</li>
                        ))}
                    </ul>
                )}
            </Card>
        </div>
    )
}

export default ProfileSideBar;