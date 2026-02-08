import { useTranslation } from "react-i18next";
import EngineLayout from "../components/EngineLayout";
import "../styles/layout.css";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="page">
      <header className="header">
        <h1>{t("home.title")}</h1>
        <p>{t("home.subtitle")}</p>
        <span className="subtitle">{t("home.description")}</span>
      </header>

      <section className="engine-section">
        <div className="engine-card">
          <EngineLayout />
        </div>
      </section>

      <div className="video-section">
        <h2>{t("home.video_title")}</h2>

        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/wFN2ZzzrDxA"
            title="BMW B58 Engine Sensors Explained"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
