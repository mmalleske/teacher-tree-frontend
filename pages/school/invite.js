import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import ProductUploader from '../../components/productUploader';
import { UserContext } from '../../contexts/UserContext';
import { Button, Card, Divider } from 'antd';
import "./school.module.scss";

const InvitePage = () => {

    return (
        <Layout>
            <Card className="school-page">
                <div className="school-header">
                    <div className="school-header__info">
                        <h1>School Name</h1>
                        <h2>School information</h2>
                    </div>
                    <div className="school-header__actions">                        
                        <Button type="primary">
                            Invite members
                        </Button>
                        <Button>
                            Export
                        </Button>
                        <sub>These buttons will only show for admin users</sub>
                    </div>
                </div>
                <Divider />
                <ProductUploader />
            </Card>
        </Layout>
    );
};

export default InvitePage;