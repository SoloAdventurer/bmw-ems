import { useTranslation } from "react-i18next";
import bmwLogo from "../../assets/images/bmw-white-logo(2).png";
import "../../styles/footer.css";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={bmwLogo} alt="BMW Logo" className="bmw-logo-image" />
            </div>
            <div>
              <h3>{t("footer.brand")}</h3>
              <p>{t("footer.tagline")}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} {t("footer.copyright")}
          </p>
          <div className="footer-badges">
            <span className="badge">{t("footer.badgeInteractive")}</span>
            <span className="badge">{t("footer.badgeB58")}</span>
            <span className="badge">{t("footer.badgeDME")}</span>
          </div>
        </div>
      </div>

      {/* Animated Background Pattern */}
      <div className="footer-pattern"></div>
    </footer>
  );
}
