import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, Checkbox, DatePicker, Select, message, Upload, Avatar } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import S3ImageUploader from './s3ImageUploader';

const EditProfileForm = ({ teacherProfile, onSubmit }) => {
    const [file, setFile] = useState(null);
    const [s3Url, setS3Url] = useState(null);

    const initialValues = {
        firstName: '',
        lastName: '',
        state: '',
        schoolName: '',
        schoolDistrict: '',
        gradeLevels: [],
        birthdate: null,
        interests: '',
        favoriteThings: {},
        userId: '',
        profilePhotoUrl: teacherProfile.profilePhotoUrl
    };

    const handleSubmit = async (values, { setFieldValue }) => {
        console.log(s3Url, "handle submit")
        if (file) {
            try {
                await handleFileUpload(file, setFieldValue);
            } catch (error) {
                console.log(error);
                message.error('An error occurred while uploading the image.');
                return;
            }
        }

        // setFieldValue('firstName', "oliver")

        // setFieldValue('profilePhotoUrl', "https://teacher-tree.s3.us-east-2.amazonaws.com/mmpix7.jpg")

        // console.log(values, "values")

        const updatedValues = {
            ...values,
            profilePhotoUrl: s3Url,
        };

        try {
            const response = await axios.patch(`${process.env.API_BASE_URL}/teachers/${teacherProfile._id}`, updatedValues);
            message.success('Profile updated successfully!');
        } catch (error) {
            console.log(error);
            message.error('An error occurred while updating the profile.');
        }
    };

    const onUpload = (s3location) => {
        console.log(s3location, "frome child")
        setS3Url(s3location)
    } 


    return (
        <Formik initialValues={teacherProfile || initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting, setFieldValue }) => (
                <Form>
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
                    <Field name="gradeLevels" as={Select} mode="multiple">
                        {[...Array(12)].map((_, index) => (
                            <Select.Option key={index + 1} value={(index + 1).toString()}>
                                {index + 1}
                            </Select.Option>
                        ))}
                    </Field>

                    <label>Birthdate</label>
                    <Field name="birthdate" as={DatePicker} />

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

                    {/* Submit Button */}
                    <Button type="primary" htmlType="submit" loading={isSubmitting}>
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default EditProfileForm;