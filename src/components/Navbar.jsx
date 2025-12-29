import { Link } from "react-router-dom";
import "./style.css";
import winLogo from "../assets/logo.svg";

function NavBar() {
  const links = [
    { name: "Work", href: "#work" },
    { name: "About", path: "/about" },
    { name: "Explorations", path: "/explorations" },
    { name: "Resume", path: "/about" },
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/"><img src={winLogo} alt="Winnie's Logo, Chinese character for win" /></Link>
      </div>
      <div className="links">
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              {link.path ? (
                <Link to={link.path}>{link.name}</Link>
              ) : (
                <a href={link.href}>{link.name}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
