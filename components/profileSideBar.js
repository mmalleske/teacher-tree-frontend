import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from "./profileSideBar.module.scss";

const ProfileSideBar = ({ teacherProfile, readOnly }) => {

    const {
        firstName,
        lastName,
        birthdate,
        birthDay,
        birthMonth,
        profilePhotoUrl,
        interests,
        favoriteThings,
        schoolName,
        schoolDistrict,
        gradeLevels
    } = teacherProfile

    if (!readOnly && !firstName && !lastName && !schoolName && !schoolDistrict) {
        return (
            <div className={styles.profileSideBar}>
                <Card>
                    <div className={styles.avatar}>
                        {profilePhotoUrl ? (
                            <Avatar size={100} src={profilePhotoUrl} />
                        ) : (
                            <Avatar size={100} icon={<UserOutlined />} />
                        )}
                        <p>Complete your profile by clicking below.</p>
                    </div>
                    <Button block href='/teacher/profile'>Edit Profile</Button>
                </Card>
            </div>
        )
    }

    const capitalizeEveryWord = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    return (
        <div className={styles.profileSideBar}>
            <Card>
                <div className={styles.avatar}>
                    {profilePhotoUrl ? (
                        <Avatar size={100} src={profilePhotoUrl} />
                    ) : (
                        <Avatar size={100} icon={<UserOutlined />} />
                    )}
                    <p>{firstName} {lastName}</p>
                </div>

                {!readOnly && <Button block href='/teacher/profile'>Edit Profile</Button>}
                <p><b>Birthday:</b> {birthdate && !birthMonth ? `${birthdate}` : `${birthMonth} ${birthDay}`}</p>
                <p><b>Interests and Hobbies:</b></p>
                <p>{interests}</p>
                <p><b>Favorite Things:</b></p>
                {favoriteThings && (
                    <ul>
                        {Object.entries(favoriteThings).map(([key, value]) => (
                            <li key={key}>
                                <b>
                                    {key === 'notToReceive'
                                        ? 'I Prefer Not to Receive'
                                        : key === 'schoolBeverage'
                                            ? 'School beverage'
                                            : capitalizeEveryWord(key)}{': '}
                                </b>
                                {value}
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
        </div>
    )
}

export default ProfileSideBar;