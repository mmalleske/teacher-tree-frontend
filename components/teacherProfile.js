import { Alert, Button, Col, Row, Space } from "antd";
import ProfileSideBar from "./profileSideBar";
import ProductUploader from "./productUploader";
import ProductList from "./productList";
import SaveTeacherButton from "./saveTeacherButton";
import Link from "next/link"


const TeacherProfile = ({ teacherProfile, donor = null, readOnly }) => {
    return (
        <Row>
            <Col lg={6} xs={24} >
                {teacherProfile && (
                    <ProfileSideBar teacherProfile={teacherProfile} readOnly={readOnly} />
                )}
                {donor && (
                    <SaveTeacherButton donor={donor} teacher={teacherProfile} />
                )}
                <br></br>
                <div>

                </div>
                <Alert
                    style={{ margin: "1rem" }}
                    showIcon
                    message="Join Awesome School?"
                    description="Your School Admin has invited you to join the Awesome School product list."
                    type="info"
                    action={
                        <Space direction="vertical">
                            <Link href="/school/123">
                                <Button size="small" type="primary">
                                    Accept
                                </Button>
                            </Link>
                            <Button size="small">
                                Decline
                            </Button>
                        </Space>
                    }
                    closable
                />
                <br></br>
            </Col>
            <Col lg={18} xs={24}>
                {readOnly ? <ProductList userId={teacherProfile.userId} /> : <ProductUploader />}
            </Col>
        </Row>
    )
}

export default TeacherProfile;