import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, Checkbox, DatePicker, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImageUploader from '../../components/imageUploader';
import S3ImageUploader from '../../components/s3ImageUploader';
import Layout from '../../components/layout';
import axios from 'axios';
import { useSession } from 'next-auth/react';

// import TextArea from 'antd/es/input/TextArea';

const { Option } = Select;

const initialValues = {
    firstName: '',
    lastName: '',
    state: '',
    schoolName: '',
    schoolDistrict: '',
    gradeLevels: [],
    birthdate: null,
    profilePhotoUrl: '',
    interests: '',
    favoriteThings: {},
    userId: '', // You'll populate this with session data
};

const TeacherProfileForm = () => {
    const { data: session } = useSession();

    const handleSubmit = async (values, { setSubmitting }) => {
        if (session.user) {
            try {
                const formData = {
                    ...values,
                    userId: session.user._id
                };
    
                // Send the form data to your API endpoint
                await axios.post(`${process.env.API_BASE_URL}/teachers`, formData);
                message.success('Profile created successfully!');
            } catch (error) {
                message.error('An error occurred while creating the profile.');
            } finally {
                setSubmitting(false);
            }
        }
    };

    const onUpload = (result) => {
        console.log(result, "S3")
    }

    return (
        <Layout>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ setFieldValue, values, handleSubmit, isSubmitting }) => (
                    <Form>
                        <div>
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
                                    <Option key={index + 1} value={(index + 1).toString()}>
                                        {index + 1}
                                    </Option>
                                ))}
                            </Field>

                            <label>Birthdate</label>
                            <Field name="birthdate" as={DatePicker} />

                            <label>Interests</label>
                            <Field name="interests" as={Input} />

                            <label>Profile Photo</label>
                            {/* <ImageUploader
                                imageUrl={values.profilePhotoUrl}
                                onUpload={(imageUrl) => setFieldValue('profilePhotoUrl', imageUrl)}
                            /> */}

                            <S3ImageUploader onUpload={onUpload} />

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
                        </div>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default TeacherProfileForm;
