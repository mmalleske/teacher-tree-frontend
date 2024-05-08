import React, { useEffect, useState,useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, Select, message, Card, Space, Modal, DatePicker } from 'antd';
import axios from 'axios';
import S3ImageUploader from './s3ImageUploader';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { stateCodes } from '../constants';
import { DeleteOutlined } from "@ant-design/icons";
import { UserContext } from '../contexts/UserContext';

export const toReadableFormat = (str) => {
    if(str === 'notToReceive') {
        return 'Prefer not to receive'
    }
    return str.replace(/([A-Z])/g, ' $1')
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
};


const EditProfileForm = ({ teacherProfile, refreshTeacherProfile, onSubmit }) => {
    const { user } = useContext(UserContext);
    const [file, setFile] = useState(null);
    const [s3Url, setS3Url] = useState(null);
    const [addingNewCategory, setAddingNewCategory] = useState(false);
    const [customValue, setCustomValue] = useState();
    const [customLabel, setCustomLabel] = useState();

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

    const defaultFavorites = {
        pets: '',
        dessert: '',
        flower: '',
        scent: '',
        color: '',
        schoolBeverage: '',
        breakfast: '',
        lunch: '',
        dinner: '',
        stores: '',
        notToReceive: ''
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

    const getOrdinal = (number) => {
        if (typeof number !== 'number') {
            throw new Error('Input must be a number');
        }

        if (number % 100 >= 11 && number % 100 <= 13) {
            return number + 'th';
        }

        switch (number % 10) {
            case 1:
                return number + 'st';
            case 2:
                return number + 'nd';
            case 3:
                return number + 'rd';
            default:
                return number + 'th';
        }
    }

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

    const toCamelCase = (str) => {
        return str.replace(/\s(.)/g, function (match) {
            return match.toUpperCase();
        }).replace(/\s/g, '').replace(/^(.)/, function (match) {
            return match.toLowerCase();
        });
    };

    const handleAddNewCategory = async () => {
        const updatedValues = { ...initialValues, favoriteThings: { ...initialValues.favoriteThings, [toCamelCase(customLabel)]: customValue } }

        try {
            const response = await axios.patch(`${process.env.API_BASE_URL}/teachers/${teacherProfile._id}`, updatedValues);
            message.success('Profile updated successfully!');
        } catch (error) {
            console.log(error);
            message.error('An error occurred while updating the profile.');
        } finally {
            setAddingNewCategory(false)
            refreshTeacherProfile(user?.userId)
        }
    }

    const handleDeleteCategory = async (categoryKey) => {
        const { [categoryKey]: deletedCategory, ...remainingCategories } = initialValues.favoriteThings;
    
        const updatedValues = { ...initialValues, favoriteThings: remainingCategories };
    
        try {
            const response = await axios.patch(`${process.env.API_BASE_URL}/teachers/${teacherProfile._id}`, updatedValues);
            message.success('Category deleted successfully!');
        } catch (error) {
            console.log(error);
            message.error('An error occurred while deleting the category.');
        } finally {
            refreshTeacherProfile(user?.userId)
        }
    };
    

    return (
        <Card>
            <Formik initialValues={teacherProfile || initialValues} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue }) => (
                    // <ConfigProvider locale={locale}>
                    <Form>
                        <Space direction='vertical'>
                            <label><b>Profile Photo: </b></label>

                            <S3ImageUploader teacherProfile={teacherProfile} onUpload={onUpload} />

                            <label><b>First Name: </b></label>
                            <Field name="firstName" as={Input} />

                            <label><b>Last Name: </b></label>
                            <Field name="lastName" as={Input} />

                            <label><b>State: </b></label>
                            <Field name="state">
                                {({ field, form }) => (
                                    <Select
                                        placeholder="Select state"
                                        style={{ width: "100%" }}
                                        value={field.value}
                                        onChange={(value) => form.setFieldValue(field.name, value)}
                                    >
                                        {stateCodes.map(state => (
                                            <Select.Option key={state.code} value={state.code}>
                                                {state.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                )}
                            </Field>

                            <label><b>School Name: </b></label>
                            <Field name="schoolName" as={Input} />

                            <label><b>School District: </b></label>
                            <Field name="schoolDistrict" as={Input} />

                            <label><b>Grade Levels: </b></label>
                            <Field name="gradeLevels">
                                {({ field, form }) => (
                                    <Select
                                        style={{ width: "100%" }}
                                        mode="multiple"
                                        value={field.value}
                                        onChange={(value) => form.setFieldValue(field.name, value)}
                                    >
                                        <Select.Option key={'early-childhood'} value="Early Childhood">
                                            Early Childhood
                                        </Select.Option>
                                        <Select.Option key={'pre-k'} value="Pre-K">
                                            Pre-K
                                        </Select.Option>
                                        <Select.Option key={'kindergarten'} value="Kindergarten">
                                            Kindergarten
                                        </Select.Option>
                                        {[...Array(12)].map((_, index) => (
                                            <Select.Option key={index + 1} value={getOrdinal(index + 1)}>
                                                {getOrdinal(index + 1)}
                                            </Select.Option>
                                        ))}
                                        <Select.Option key={'other'} value="Other">
                                            Other
                                        </Select.Option>
                                    </Select>
                                )}
                            </Field>

                            <div>
                                <div>
                                    <label style={{ display: "block" }}><b>Birth Month: </b></label>
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
                                    <label style={{ display: "block" }}><b>Birth Day:</b></label>
                                    <Field name="birthDay">
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: "100%" }}
                                                value={field.value}
                                                onChange={(value) => form.setFieldValue(field.name, value)}
                                            >
                                                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                                    <Select.Option key={day} value={getOrdinal(day)}>
                                                        {getOrdinal(day)}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        )}
                                    </Field>
                                </div>
                            </div>

                            <label><b>Interests:</b></label>
                            <Field name="interests" as={Input} />

                            <label><b>Favorite Things:</b></label>
                            {/* default fields */}
                            {Object.keys(defaultFavorites).map((key) => (
                                <div key={key}>
                                    <label>{toReadableFormat(key)}:</label>
                                    <Field name={`favoriteThings.${key}`} as={Input} placeholder={toReadableFormat(key)} />
                                </div>
                            ))}

                            {/* Render additional fields */}
                            {teacherProfile && Object.keys(teacherProfile.favoriteThings).map((key) => (
                                !defaultFavorites.hasOwnProperty(key) && (
                                    <div key={key}>
                                        <label>{toReadableFormat(key)}:</label>
                                        <div style={{display: "flex"}}>
                                            <Field key={key} name={`favoriteThings.${key}`} as={Input} placeholder={toReadableFormat(key)} />
                                            <Button type="dashed" key="delete" onClick={() => handleDeleteCategory(key)}><DeleteOutlined /></Button>
                                        </div>                                        
                                    </div>
                                )
                            ))}
                            <Button block type="default" onClick={() => setAddingNewCategory(true)}>
                                + Add New Category
                            </Button>
                            <Button block type="primary" htmlType="submit" loading={isSubmitting}>
                                Submit
                            </Button>
                        </Space>
                    </Form>
                )}
            </Formik>
            <Modal
                title="Add New Category"
                open={addingNewCategory}
                onOk={handleAddNewCategory}
                onCancel={() => setAddingNewCategory(false)}
            >
                <Input
                    type="text"
                    placeholder="Category Name (e.g.) Favorite brand of Jewelry"
                    onChange={(e) => setCustomLabel(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Category Value (e.g.) Gucci"
                    onChange={(e) => setCustomValue(e.target.value)}
                />
            </Modal>
        </Card>
    )
}

export default EditProfileForm;