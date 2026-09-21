import NavBar from "../components/Navbar"
import Footer from "../components/Footer"
import Introduction from "../components/Introduction"
import Experience from "../components/Experience"
import Community from "../components/Community"
import { useEffect } from "react"
import "../components/about.css";

function About () {
    useEffect(() => {
        document.title = "About Winnie";
    })

    return (
        <div>
            <main className="aboutMainContent">
                <NavBar />
                <Introduction />
                <Experience />
                <Community />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default About