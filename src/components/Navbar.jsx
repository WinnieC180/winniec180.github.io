import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";
import winLogo from "../assets/logo.svg";
import navHook from "../assets/hookFront.svg";
import navHookBack from "../assets/hookBack.svg";
import navbarBg from "../assets/Navbar_bg.svg";
import navbarBgDark from "../assets/Navbar_bg_dark.svg";
import { X, Menu, Github, Linkedin, Sun, Moon } from "lucide-react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        const workSection = document.getElementById("work");
        if (workSection) {
          const rect = workSection.getBoundingClientRect();
          setActiveTab(rect.top <= 150 && rect.bottom >= 150 ? "work" : "");
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const navLinks = [
    { name: "Work", type: "anchor" },
    { name: "About", path: "/about", type: "route" },
    { name: "Explorations", path: "/explorations", type: "route" },
  ];

  const externalLinks = [
    {
      name: "Github",
      path: "https://github.com/WinnieC180",
      icon: <Github size={16} />,
    },
    {
      name: "LinkedIn",
      path: "https://www.linkedin.com/in/winnie-chan-503804367/",
      icon: <Linkedin size={16} />,
    },
    {
      name: "Resume",
      path: "https://drive.google.com/file/d/1FsZhuG9mBveiLF2bkk_u5Yclsn_5AVfi/view?usp=sharing",
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="menu centerFlex"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`navSidebar ${isMenuOpen ? "open" : ""}`}>
        <img src={navHook} alt="" className="navSidebarHook" />

        <div
          className="navSidebarCard"
          style={{ backgroundImage: theme === "dark" ? `url(${navbarBgDark})` : `url(${navbarBg})` }}
        >
          <Link
            to="/"
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="navSidebarLogo"
            style={{ display: "flex" }}
          >
            <img src={winLogo} alt="Winnie's Logo, Chinese character for win" />
            <span className="navSidebarLogoCaption">' To Win'</span>
          </Link>

          <div className="navSidebarSection">
            <p className="navSidebarLabel">Navigation</p>
            <ul>
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.type === "anchor" ? (
                    <button
                      onClick={goToWork}
                      className={`navLinkButton ${
                        activeTab === "work" && location.pathname === "/"
                          ? "active"
                          : ""
                      }`}
                    >
                      {link.name}
                    </button>
                  ) : (
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      {link.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="navSidebarSection">
            <p className="navSidebarLabel">Links</p>
            <ul>
              {externalLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.path} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="themeToggle centerFlex"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>

          <div className="navSidebarFooter">
            <p>© Winnie Chan 2026</p>
            <p>Supported by the love and encouragement of some amazing individuals!</p>
            <p>Made by Figma and React.js</p>
          </div>
        </div>
        <img src={navHookBack} alt="" className="navSidebarHookBack" />
      </aside>

      {isMenuOpen && (
        <div className="navSidebarOverlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  );
}

export default NavBar;