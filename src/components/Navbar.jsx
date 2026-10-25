import { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme, toggleTheme } from "../theme";
import logo from "../assets/sea/roundfish-gold.png";
import "./navbar.css";

const COMPACT_AFTER = 80; // px scrolled before the nav tucks up
const HIDE_AT = 0.5;      // share of the screen the footer must cover before the nav hides (0–1)

function NavBar() {
  const night = useTheme() === "dark";
  const [open, setOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [compact, setCompact] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // links close the menu on click; Escape closes it too
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // tuck the nav up once scrolled; hide it when the footer covers enough of the screen
  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > COMPACT_AFTER);
      const footer = document.querySelector("footer");
      if (!footer) return setFooterVisible(false);
      const r = footer.getBoundingClientRect();
      const vh = window.innerHeight;
      const shown = Math.max(0, Math.min(vh, r.bottom) - Math.max(0, r.top));
      const hide = shown / vh >= HIDE_AT;
      setFooterVisible(hide);
      if (hide) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      setFooterVisible(false);
    };
  }, [location.pathname]);

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
    </>
  );

  return (
    <nav
      className={`pillNav${night ? " night" : ""}${open ? " isOpen" : ""}${compact ? " isCompact" : ""}${footerVisible ? " isHidden" : ""}`}
      aria-hidden={footerVisible}
    >
      <div className="pillNavBar">
        <Link to="/" className="pillNavLogo" tabIndex={footerVisible ? -1 : 0} onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <img src={logo} alt="Home" />
        </Link>
        <div className="pillNavLinks">{links}</div>
        <button type="button" className="pillNavIcon pillNavTheme" tabIndex={footerVisible ? -1 : 0} onClick={toggleTheme} aria-label={night ? "Switch to day" : "Switch to night"}>
          {night ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          type="button"
          className="pillNavIcon pillNavBurger"
          tabIndex={footerVisible ? -1 : 0}
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