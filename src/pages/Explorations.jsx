import NavBar from "../components/Navbar"
import { useEffect } from "react";

function Explorations () {
    useEffect(() => {
        document.title = "Winnie's Explorations";
    })

    return (
        <div>
            <NavBar />
        </div>
    )
}

export default Explorations