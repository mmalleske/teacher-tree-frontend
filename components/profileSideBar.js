import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from "./profileSideBar.module.scss";
import { toReadableFormat } from './editProfileForm';
import EditProfileForm from './editProfileForm';

const ProfileSideBar = ({ teacherProfile, readOnly, refreshProfile }) => {
    const months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
    };

    const [editModalOpen, setEditModalOpen] = useState(false);

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

    const onSubmit = () => {
        refreshProfile();
        setEditModalOpen(false);
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
                    <p>{schoolName}, {schoolDistrict}</p>
                </div>

                {!readOnly && <Button block onClick={() => setEditModalOpen(true)}>Edit Profile</Button>}
                <p><b>Birthday:</b> {birthdate && !birthMonth ? `${birthdate}` : `${months[birthMonth]} ${birthDay}`}</p>
                <p><b>Interests and Hobbies:</b></p>
                <p>{interests}</p>
                <p><b>Favorite Things:</b></p>
                {favoriteThings && (
                    <ul>
                        {Object.entries(favoriteThings).map(([key, value]) => (
                            <li key={key}>
                                <b>{toReadableFormat(key)}: </b>
                                {value}
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
            <Modal
                title={'Edit Profile'}
                open={editModalOpen}
                onCancel={() => setEditModalOpen(false)}
                footer={null} // Removes default buttons
                destroyOnClose
            >
               <EditProfileForm teacherProfile={teacherProfile} refreshTeacherProfile={onSubmit} onSubmit={onSubmit} />
            </Modal>
        </div>
    )
}

export default ProfileSideBar;