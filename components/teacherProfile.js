import { Alert, Button, Col, Row, Space } from "antd";
import ProfileSideBar from "./profileSideBar";
import ProductUploader from "./productUploader";
import ProductList from "./productList";
import SaveTeacherButton from "./saveTeacherButton";
import Link from "next/link"
import InviteAlert from "./InviteAlert";


const TeacherProfile = ({ teacherProfile, donor = null, readOnly }) => {
    console.log(teacherProfile, "teache")
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
                {!readOnly && teacherProfile.invites && !!teacherProfile.invites.length && teacherProfile.invites.filter((invite) => invite.status === "pending").map((invite) => (
                    <InviteAlert invite={invite} />
                ))}
                <br></br>
            </Col>
            <Col lg={18} xs={24}>
                {readOnly ? <ProductList userId={teacherProfile.userId} /> : <ProductUploader />}
            </Col>
        </Row>
    )
}

export default TeacherProfile;