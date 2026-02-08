import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import bmwLogo from "../../assets/images/bmw-white-logo(2).png";
import "../../styles/navbar.css";

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <img src={bmwLogo} alt="BMW Logo" className="bmw-logo-image" />
          </div>
          <div className="logo-text">
            <span className="brand">BMW</span>
            <span className="tagline">{t("footer.brand")}</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            <span className="link-icon">🏠</span>
            {t("nav.home")}
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
          >
            <span className="link-icon">ℹ️</span>
            {t("nav.about")}
          </Link>
        </div>

        {/* Controls Section */}
        <div className="nav-controls">
          <LanguageSwitcher />

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={t("theme.toggle")}
          >
            {theme === "light" ? (
              <span className="theme-icon">🌙</span>
            ) : (
              <span className="theme-icon">☀️</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
