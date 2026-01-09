import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import winLogo from "../assets/logo-light.svg";
import resume from "../assets/ResumeWinnieChan.pdf";
import { X, Menu } from "lucide-react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (location.pathname === "/") {
        const workSection = document.getElementById("work");
        if (workSection) {
          const rect = workSection.getBoundingClientRect();
          // If work section is in view
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveTab("work");
          } else {
            setActiveTab("");
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("#work")) {
      setTimeout(() => {
        const element = document.getElementById("work");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  }, [location]);

  const links = [
    { name: "Work", path: "#work", type: "anchor" },
    { name: "About", path: "/about", type: "route" },
    { name: "Explorations", path: "/explorations", type: "route" },
    { name: "Resume", path: resume, type: "file" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="logo centerFlex">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={winLogo} alt="Winnie's Logo, Chinese character for win" />
        </Link>
      </div>
      <div className="links">
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              {link.type === "anchor" ? (
                <a
                  href={`#${link.path}`} 
                  className={
                    activeTab === "work" && location.pathname === "/"
                      ? "active"
                      : ""
                  }
                >
                  {link.name}
                </a>
              ) : link.type === "file" ? (
                <a href={link.path} target="_blank">
                  {link.name}
                </a>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {link.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="menu centerFlex"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* mobile menu */}
      {isMenuOpen && (
        <div className="mobileMenu centerFlex">
          <ul>
            {links.map((link, index) => (
              <li key={link.name} style={{ animationDelay: `${index * 0.1}s` }}>
                {link.path.startsWith("/#") ? (
                  <a href={link.path} onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </a>
                ) : (
                  <Link to={link.path} onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
