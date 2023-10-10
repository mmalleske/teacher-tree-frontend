import Nav from "./nav";
import styles from "./termsLayout.module.scss";
import Footer from "./footer";
import { Card, Divider } from "antd";

export default function TermsLayout({ title, children }) {
    return (
        <>
            <Nav />
            <Card>
                <div className={styles.title}>
                    <img src="/assets/images/teacher-tree-logo.webp" />
                    <h1>{title}</h1>
                </div>
                <Divider />
                {children}
                <Divider />
                <Footer />
            </Card>
        </>
    )
}