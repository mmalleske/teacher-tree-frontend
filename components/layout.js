
import Nav from "./nav"

export default function Layout({ children }) {
    return (
        <div>
            <Nav />
            <div style={{ padding: "2rem" }}>
                {children}
            </div>
        </div>
    )
}