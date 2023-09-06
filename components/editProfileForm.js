import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, Select, message, Card, Space, DatePicker } from 'antd';
import axios from 'axios';
import S3ImageUploader from './s3ImageUploader';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

const EditProfileForm = ({ teacherProfile, onSubmit }) => {
    const [file, setFile] = useState(null);
    const [s3Url, setS3Url] = useState(null);

    const router = useRouter();

    const validationSchema = Yup.object().shape({
        birthdate: Yup.string()
            .matches(
                /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
                'Please enter a valid date in MM/DD/YYYY format'
            )
            .required('Birthdate is required'),
    });

    const initialValues = {
        firstName: teacherProfile ? teacherProfile.firstName : '',
        lastName: teacherProfile ? teacherProfile.lastName : '',
        state: teacherProfile ? teacherProfile.state : '',
        schoolName: teacherProfile ? teacherProfile.schoolName : '',
        schoolDistrict: teacherProfile ? teacherProfile.schoolDistrict : '',
        gradeLevels: teacherProfile ? teacherProfile.gradeLevels : [],
        birthdate: teacherProfile ? teacherProfile.birthdate : '',
        interests: teacherProfile ? teacherProfile.interests : '',
        favoriteThings: teacherProfile ? teacherProfile.favoriteThings : {},
        userId: teacherProfile.userId,
        profilePhotoUrl: teacherProfile.profilePhotoUrl
    };

    const months = [
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    const handleSubmit = async (values, { setFieldValue }) => {
        if (file) {
            try {
                await handleFileUpload(file, setFieldValue);
            } catch (error) {
                console.log(error);
                message.error('An error occurred while uploading the image.');
                return;
            }
        }

        const updatedValues = s3Url ? {
            ...values,
            profilePhotoUrl: s3Url,
        } : { ...values };

        try {
            const response = await axios.patch(`${process.env.API_BASE_URL}/teachers/${teacherProfile._id}`, updatedValues);
            message.success('Profile updated successfully!');
        } catch (error) {
            console.log(error);
            message.error('An error occurred while updating the profile.');
        } finally {
            router.push('/teacher/dashboard')
        }
    };

    const onUpload = (s3location) => {
        setS3Url(s3location)
    }

    return (
        <Card>
            <Formik initialValues={teacherProfile || initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {({ isSubmitting, setFieldValue }) => (
                    // <ConfigProvider locale={locale}>
                    <Form>
                        <Space direction='vertical'>
                            <label>Profile Photo</label>

                            <S3ImageUploader teacherProfile={teacherProfile} onUpload={onUpload} />

                            <label>First Name</label>
                            <Field name="firstName" as={Input} />

                            <label>Last Name</label>
                            <Field name="lastName" as={Input} />

                            <label>State</label>
                            <Field name="state" as={Input} />

                            <label>School Name</label>
                            <Field name="schoolName" as={Input} />

                            <label>School District</label>
                            <Field name="schoolDistrict" as={Input} />

                            <label>Grade Levels</label>
                            <Field name="gradeLevels">
                                {({ field, form }) => (
                                    <Select
                                        mode="multiple"
                                        value={field.value}
                                        onChange={(value) => form.setFieldValue(field.name, value)}
                                    >
                                        {[...Array(12)].map((_, index) => (
                                            <Select.Option key={index + 1} value={(index + 1).toString()}>
                                                {index + 1}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                )}
                            </Field>

                            <div>
                                <div>
                                    <label style={{ display: "block" }}>Birth Month</label>
                                    <Field name="birthMonth">
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: "100%" }}
                                                value={field.value}
                                                onChange={(value) => form.setFieldValue(field.name, value)}
                                            >
                                                {months.map((month) => (
                                                    <Select.Option key={month.value} value={month.value}>
                                                        {month.label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        )}
                                    </Field>
                                </div>
                                <div>
                                    <label style={{ display: "block" }}>Birth Day</label>
                                    <Field name="birthDay">
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: "100%" }}
                                                value={field.value}
                                                onChange={(value) => form.setFieldValue(field.name, value)}
                                            >
                                                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                                    <Select.Option key={day} value={day.toString().padStart(2, '0')}>
                                                        {day}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        )}
                                    </Field>
                                </div>
                            </div>

                            <label>Interests</label>
                            <Field name="interests" as={Input} />

                            <label>Favorite Things</label>
                            <Field name="favoriteThings.pets" as={Input} placeholder="Pets" />
                            <Field name="favoriteThings.dessert" as={Input} placeholder="Dessert" />
                            <Field name="favoriteThings.flower" as={Input} placeholder="Flower" />
                            <Field name="favoriteThings.scent" as={Input} placeholder="Scent" />
                            <Field name="favoriteThings.color" as={Input} placeholder="Color" />
                            <Field name="favoriteThings.schoolBeverage" as={Input} placeholder="School Beverage" />
                            <Field name="favoriteThings.breakfast" as={Input} placeholder="Breakfast Restaurant & Item" />
                            <Field name="favoriteThings.lunch" as={Input} placeholder="Lunch Restaurant & Item" />
                            <Field name="favoriteThings.dinner" as={Input} placeholder="Dinner Restaurant" />
                            <Field name="favoriteThings.stores" as={Input} placeholder="Stores & Gift Cards" />
                            <Field name="favoriteThings.notToReceive" as={Input} placeholder="I Prefer Not To Receive" />
                            <Button block type="primary" htmlType="submit" loading={isSubmitting}>
                                Submit
                            </Button>
                        </Space>
                    </Form>
                )}
            </Formik>
        </Card>
    )
}

export default EditProfileForm;