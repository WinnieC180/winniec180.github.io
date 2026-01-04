import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import winLogo from "../assets/logo-light.svg";
import { X, Menu } from "lucide-react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Work", path: "/#work" },
    { name: "About", path: "/about" },
    { name: "Explorations", path: "/explorations" },
    { name: "Resume", path: "/about" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="logo centerFlex">
        <Link to="/">
          <img src={winLogo} alt="Winnie's Logo, Chinese character for win" />
        </Link>
      </div>
      <div className="links">
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              {link.path.startsWith("/#") ? (
                <a href={link.path}>{link.name}</a>
              ) : (
                <Link to={link.path}>{link.name}</Link>
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
