import { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme, toggleTheme } from "../theme";
import logo from "../assets/sea/roundfish-gold.png";
import "./navbar.css";

const RESUME = "https://drive.google.com/file/d/1FsZhuG9mBveiLF2bkk_u5Yclsn_5AVfi/view?usp=sharing";

function NavBar() {
  const night = useTheme() === "dark";
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // links close the menu on click; Escape closes it too
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goToWork = (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById("work");
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 40, behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollTarget", "work");
      navigate("/");
    }
  };

  const links = (
    <>
      <a href="#work" onClick={goToWork}>Work</a>
      <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
      <NavLink to="/explorations" onClick={() => setOpen(false)}>Explorations</NavLink>
      <a href={RESUME} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Resume</a>
    </>
  );

  return (
    <nav className={`pillNav${night ? " night" : ""}${open ? " isOpen" : ""}`}>
      <div className="pillNavBar">
        <Link to="/" className="pillNavLogo" onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <img src={logo} alt="Home" />
        </Link>
        <div className="pillNavLinks">{links}</div>
        <button type="button" className="pillNavIcon pillNavTheme" onClick={toggleTheme} aria-label={night ? "Switch to day" : "Switch to night"}>
          {night ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          type="button"
          className="pillNavIcon pillNavBurger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="pillNavMenu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <div id="pillNavMenu" className="pillNavMenu" hidden={!open}>{links}</div>
    </nav>
  );
}

export default NavBar;
