import { useTranslation } from "react-i18next";
import type { SensorData } from "../data/sensors";
import "../styles/sensor-card.css";

interface Props {
  sensor: SensorData;
  onClose: () => void;
}

export default function SensorCard({ sensor, onClose }: Props) {
  const { t } = useTranslation();

  // Get translated sensor data
  const sensorName = t(`sensors.${sensor.id}.name`, sensor.name);
  const sensorFunction = t(`sensors.${sensor.id}.function`, sensor.function);
  const sensorHowItWorks = t(
    `sensors.${sensor.id}.howItWorks`,
    sensor.howItWorks,
  );
  const sensorHealthyRange = t(
    `sensors.${sensor.id}.healthyRange`,
    sensor.healthyRange,
  );

  // Get translated variations array
  const variations = sensor.variations.map((_, index) =>
    t(`sensors.${sensor.id}.variations.${index}`, sensor.variations[index]),
  );

  return (
    <div className="sensor-card-overlay" onClick={onClose}>
      <div className="sensor-detail-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-btn"
          onClick={onClose}
          aria-label={t("sensorCard.close")}
        >
          ✕
        </button>

        <div className="card-header">
          <h2>
            {sensorName}
            <span className={`badge ${sensor.type.toLowerCase()}`}>
              {sensor.type}
            </span>
          </h2>
        </div>

        <div className="card-content">
          <div className="image-section">
            <img
              src={sensor.image}
              alt={sensorName}
              className="sensor-image-detail"
            />

            {/* --- LIVE GAUGE OVERLAY --- */}
            <div className="live-gauge-container">
              <span className="gauge-label">{t("sensorCard.liveData")}</span>
              <div className="gauge-track">
                <div
                  className={`gauge-fill ${sensor.type.toLowerCase()}-pulse`}
                ></div>
              </div>
              <code className="gauge-value">
                {sensorHealthyRange.split("|")[0]}
              </code>
            </div>
          </div>

          <div className="info-section">
            <div className="info-block">
              <h3>{t("sensorCard.function")}</h3>
              <p>{sensorFunction}</p>
            </div>

            <div className="info-block">
              <h3>{t("sensorCard.howItWorks")}</h3>
              <p>{sensorHowItWorks}</p>
            </div>

            <div className="info-block">
              <h3>{t("sensorCard.healthyRange")}</h3>
              <code className="range-display">{sensorHealthyRange}</code>
            </div>

            <div className="info-block">
              <h3>{t("sensorCard.commonTypes")}</h3>
              <ul className="variations-list">
                {variations.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
