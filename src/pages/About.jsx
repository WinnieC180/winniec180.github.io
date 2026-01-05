import NavBar from "../components/Navbar"
import Footer from "../components/Footer"
import Introduction from "../components/Introduction"
import { useEffect } from "react"

function About () {
    useEffect(() => {
        document.title = "About Winnie";
    })

    return (
        <div>
            <NavBar />

            <main>
                <Introduction />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default About