import Head from 'next/head'
import styles from "./landing.module.scss"
import { Button, Card, Space, Divider, Row, Col, Avatar } from 'antd'
import Nav from "../components/nav";
import { FaConfluence, FaChalkboardTeacher, FaHandHoldingHeart, FaFacebook } from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';

export default function Home() {
  return (
    <>
      <Nav />
      <section className={styles.header}>
        <Row justify={"space-around"}>
          <Col lg={8} xs={24}>
            <h1>Teacher Tree</h1>
            <h2>Connecting Communities With Classrooms</h2>
            <p>
              <i>Our mission is to provide an easier and more efficient method of meeting the needs of educators by providing them with a platform to request the supplies and support they need to educate students and enlighten the leaders of tomorrow.</i>
            </p>
          </Col>
          <Col lg={8}>
            <img src="/assets/images/teacher-tree-logo.webp" />
          </Col>
        </Row>
      </section>
      <section className={styles.loginCtas}>
        <Row justify="center">
          <h1>Who uses Teacher Tree?</h1>
        </Row>
        <Row justify="space-around">
          <Col lg={8}>
            <Card className={styles.ttCard} bodyStyle={{ textAlign: "center" }}>
              <div className={styles.icon}>
                <FaChalkboardTeacher />
              </div>
              <div>
                <h2>Teachers</h2>
                <p>Teachers and other educators can share their preferences and post supplies and other classroom items onto their wishlist.</p>
                <Divider />
                <Button href="/register?userType=teacher" type='primary'>Get Started</Button>
              </div>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className={styles.ttCard} bodyStyle={{ textAlign: "center" }}>
              <div className={styles.icon}>
                <FaHandHoldingHeart />
              </div>
              <div>
                <h2>Donors</h2>
                <p>Donors can locate teachers to view their wishlist and help fulfill their needs for supplies or enrichment.</p>
                <Divider />
                <Button href="/register?userType=donor" type='primary'>Get Started</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </section>
      <section className={styles.testimonials}>
        <Row justify="center">
          <h1>Testimonials</h1>
        </Row>
        <Row justify={"space-around"}>
          <Col lg={6}>
            <Card className={styles.ttCard} bodyStyle={{ textAlign: "center" }}>
              <div className={styles.testimonialAvatar}>
                <Avatar src="/assets/images/testimonial1.jpg" size={128} />
                <p><i>"I was able to quickly and easily share items I need for my classroom on their website. Parents were then able to view, purchase and send those items right to my classroom!"</i></p>
                <p><b>Gretchen K.</b></p>
                <p>2nd Grade Teacher</p>
              </div>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className={styles.ttCard} bodyStyle={{ textAlign: "center" }}>
              <div className={styles.testimonialAvatar}>
                <Avatar src="/assets/images/testimonial2.jpg" size={128} />
                <p><i>“It’s neat that there’s also a place to list my interests and favorites so that parents can easily access that information as well. Thanks for a great service, Teacher Tree!”</i></p>
                <p><b>Georgie G.</b></p>
                <p>2nd Grade Teacher</p>
              </div>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className={styles.ttCard} bodyStyle={{ textAlign: "center" }}>
              <div className={styles.testimonialAvatar}>
                <Avatar src="/assets/images/testimonial3.jpg" size={128} />
                <p><i>“Teacher Tree has simplified everything from classroom supplies and donations to gifts.  My parents always know what items our classroom is needing.”</i></p>
                <p><b>Tracy V.</b></p>
                <p>2nd Grade Teacher</p>
              </div>
            </Card>
          </Col>
        </Row>
      </section>
      <section className={styles.social}>
        <Row justify={"center"}>
          <Col>
            <img src="/assets/images/teacher-tree-logo.webp" />
            <h1>Branching Out</h1>
            <div className={styles.iconList}>
              <Space>
                <SocialIcon url="https://www.pinterest.com/teachertreeinc/" />
                <SocialIcon url="https://www.linkedin.com/company/teachertree/about/" />
                <SocialIcon url="https://twitter.com/i/flow/login?redirect_after_login=%2Fteacher_tree" />
                <SocialIcon url="https://www.facebook.com/TeacherTreeInc/" />
              </Space>
            </div>
          </Col>
        </Row>
      </section>
    </>
  )
}
