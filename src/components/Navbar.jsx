import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import winLogo from "../assets/logo-light.svg";
import { X, Menu } from "lucide-react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (location.pathname === "/") {
        const workSection = document.getElementById("work");
        if (workSection) {
          const rect = workSection.getBoundingClientRect();
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

  const goToWork = () => {
    setIsMenuOpen(false);

    if (location.pathname === "/") {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollTarget", "work");
      navigate("/");
    }
  };

  const links = [
    { name: "Work", type: "anchor" },
    { name: "About", path: "/about", type: "route" },
    { name: "Explorations", path: "/explorations", type: "route" },
    { name: "Resume", path: "https://drive.google.com/file/d/13GOqvRqhn9KUzzz5bAEHSO200yBovthh/view?usp=sharing", type: "file" },
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
                <button
                  onClick={goToWork}
                  className={`navLinkButton ${
                    activeTab === "work" && location.pathname === "/" ? "active" : ""
                  }`}
                >
                  {link.name}
                </button>
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
                {link.type === "anchor" ? (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      goToWork();
                    }}
                  >
                    {link.name}
                  </a>
                ) : link.type === "file" ? (
                  <a href={link.path} target="_blank" onClick={() => setIsMenuOpen(false)}>
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