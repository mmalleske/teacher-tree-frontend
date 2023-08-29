import { Col, Row } from "antd";
import ProfileSideBar from "./profileSideBar";
import ProductUploader from "./productUploader";
import ProductList from "./productList";
import SaveTeacherButton from "./saveTeacherButton";

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
            </Col>
            <Col lg={18} xs={24}>
                {readOnly ? <ProductList userId={teacherProfile.userId} />: <ProductUploader />}
            </Col>
        </Row>
    )
}

export default TeacherProfile;