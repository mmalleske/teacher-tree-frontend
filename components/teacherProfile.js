import { useEffect } from "react";
import { Alert, Button, Col, Row, Space } from "antd";
import ProfileSideBar from "./profileSideBar";
import ProductUploader from "./productUploader";
import ProductList from "./productList";
import SaveTeacherButton from "./saveTeacherButton";
import InviteAlert from "./InviteAlert";
import useSchools from "../hooks/useSchools";

const TeacherProfile = ({ teacherProfile, donor = null, readOnly, refreshProfile }) => {

    const { fetchSchool, school } = useSchools();

    useEffect(() => {
        if(!!teacherProfile?.schoolIds.length) {
            fetchSchool(teacherProfile.schoolIds[0])
        }
    },[])

    return (
        <Row>
            <Col lg={6} xs={24} >
                {teacherProfile && (
                    <ProfileSideBar teacherProfile={teacherProfile} readOnly={readOnly} refreshProfile={refreshProfile} />
                )}
                {donor && (
                    <SaveTeacherButton donor={donor} teacher={teacherProfile} />
                )}
                <br></br>
                {!readOnly && teacherProfile.invites && !!teacherProfile.invites.length && teacherProfile.invites.filter((invite) => invite.status === "pending").map((invite, index) => (
                    <InviteAlert key={`invite-${index}`} invite={invite} />
                ))}
                <br></br>
            </Col>
            <Col lg={18} xs={24}>
                {readOnly ? <ProductList userId={teacherProfile.userId} /> : <ProductUploader teacher={teacherProfile} school={school} />}
            </Col>
        </Row>
    )
}

export default TeacherProfile;