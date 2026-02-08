import { useTranslation } from "react-i18next";
import "../../styles/language-switcher.css";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar-EG" : "en");
  };

  return (
    <button
      className="language-switcher"
      onClick={toggleLanguage}
      aria-label={t("language.toggle")}
      data-lang={i18n.language}
    >
      <div className="language-switcher-flags">
        <span className="lang-flag">🇺🇸</span>
        <span className="lang-flag">🇪🇬</span>
      </div>
      <span className="lang-code">
        {i18n.language === "en" ? "English" : "عربي"}
      </span>
    </button>
  );
}
