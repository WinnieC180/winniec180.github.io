import { Link } from "react-router-dom";
import { useState } from "react";
import "./style.css";
import winLogo from "../assets/logo.svg";
import { X, Menu } from "lucide-react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: "Work", path: "/#work" },
    { name: "About", path: "/about" },
    { name: "Explorations", path: "/explorations" },
    { name: "Resume", path: "/about" },
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={winLogo} alt="Winnie's Logo, Chinese character for win" />
        </Link>
      </div>
      <div className="links">
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => setIsMenuOpen((prev) => !prev)} className="menu">
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* mobile menu */}
      {isMenuOpen && (
        <div className="mobileMenu">
          <ul>
            {links.map((link, index) => (
              <li key={link.name} style={{ animationDelay: `${index * 0.1}s` }}>
                <Link
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
