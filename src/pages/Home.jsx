import { useState, useEffect } from "react";
import NavBar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import Works from "../components/Works"
import Footer from "../components/Footer"
import IntroAnimation from "../components/IntroAnimation"
import { hasPlayedIntro, markIntroPlayed } from "../introState"

function Home () {
    const [entered, setEntered] = useState(hasPlayedIntro);

    const handleEnter = () => {
        markIntroPlayed();
        setEntered(true);
    };

    useEffect(() => {
        document.body.classList.toggle("noScroll", !entered);
        return () => {
            document.body.classList.remove("noScroll");
        };
    }, [entered]);

    useEffect(() => {
        if (!entered) return;

        const target = sessionStorage.getItem("scrollTarget");
        if (target) {
            sessionStorage.removeItem("scrollTarget");
            requestAnimationFrame(() => {
                document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
            });
        }
    }, [entered]);

    return (
        <div>
            {!entered && <IntroAnimation onEnter={handleEnter} />}
            <NavBar />
            <main>
                <HeroSection />
                <Works />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Home