import { Card, Divider } from 'antd';
import Layout from '../components/layout';
import TeacherTable from '../components/teacherTable';

const SuperAdminDashboard = () => {
    return (
        <Layout>
            <Card>
                <div className="admin-page__header">
                    <h1>Welcome Super Admin!</h1>
                </div>
                <Divider />
                <div className="admin-page__school-list">
                    <h2>Teachers:</h2>
                    <TeacherTable />
                </div>
            </Card>

        </Layout>
    );
};

export default SuperAdminDashboard;
