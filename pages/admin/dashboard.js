import { Card, Divider } from 'antd';
import Layout from '../../components/layout';
import AdminSchools from '../../components/AdminSchools';
import useAdminProfile from '../../hooks/useAdminProfile';

const AdminProfilePage = () => {
    const { adminProfile, fetchAdminProfile, loading, error } = useAdminProfile();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!adminProfile) {
        return <p>No admin profile found.</p>;
    }

    return (
        <Layout>
            <Card>
                <h1>Welcome Admin {adminProfile.ownerName}</h1>
                <Divider />
                <AdminSchools adminProfile={adminProfile} refreshProfile={fetchAdminProfile} />
            </Card>
        </Layout>
    );
};

export default AdminProfilePage;
