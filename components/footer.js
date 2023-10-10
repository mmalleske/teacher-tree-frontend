import Link from "next/link"
import styles from "./footer.module.scss";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <Link href="/privacyPolicy">Privacy Policy</Link> |
            <Link href="/privacyPolicy">Privacy Policy</Link> |
            <Link href="/privacyPolicy">Privacy Policy</Link> 
        </div>
    )
}