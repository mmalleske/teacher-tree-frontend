
import Nav from "./nav"

export default function Layout({ children }) {
    return (
        <div style={{padding: "2rem"}}>
            <Nav />
            {children}
            </div>
        )
}