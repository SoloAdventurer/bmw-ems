import { useTranslation } from "react-i18next";
import "../styles/engine-layout.css";
import { useRef, useState } from "react";

// Import the Main Engine Image
import engineMain from "../assets/images/roman-tikhonov-engine-5.png";
import { sensors } from "../data/sensors";
import bmwLogo from "../assets/images/bmw-logo.jpg";
import SensorCard from "./SensorCard";
import type { SensorData } from "../data/sensors";

export default function EngineLayout() {
  const [selectedSensor, setSelectedSensor] = useState<SensorData | null>(null);
  const [activatingThrottle, setActivatingThrottle] = useState(false);

  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Handle throttle click with special activation animation
  const handleThrottleClick = () => {
    setActivatingThrottle(true);

    const sensor = sensors.throttle;

    // Play throttle sound for exactly 3500ms
    if (sensor?.sound) {
      // Stop any previously playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }

      const audio = new Audio(sensor.sound);
      audioRef.current = audio;
      audio.volume = 0.5;

      audio.play().catch((err) => {
        if (err.name !== "AbortError") console.error("Playback error:", err);
      });

      // Stop audio after exactly 3500ms
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current = null;
        }
      }, 7000);
    }

    // Show modal after animation
    timeoutRef.current = window.setTimeout(() => {
      setActivatingThrottle(false);
      setSelectedSensor(sensor);
    }, 3500);
  };

  // Cleanup function
  const cleanup = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  // Handle regular sensor clicks - just show modal immediately
  const handleSensorClick = (id: string) => {
    const sensor = sensors[id];
    if (sensor) {
      setSelectedSensor(sensor);
    }
  };

  // Helper for dot colors
  const getSensorColor = (type: "Input" | "Output") =>
    type === "Input" ? "var(--sensor-input)" : "var(--sensor-output)";

  return (
    <section className="section container">
      {/* --- BMW ACTIVATION OVERLAY (Throttle Only) - Viper Shift Light Style --- */}
      {activatingThrottle && (
        <div className="activation-overlay">
          <div className="shift-light-container">
            {/* Outer pulsating rings - like Viper dashboard */}
            <div className="pulse-ring pulse-ring-1"></div>
            <div className="pulse-ring pulse-ring-2"></div>
            <div className="pulse-ring pulse-ring-3"></div>

            {/* BMW Logo in center */}
            <div className="logo-circle">
              <img
                src={bmwLogo}
                alt="BMW Active"
                className="bmw-logo-circular"
              />
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Title */}
      <h2>{t("home.interactive_map", "Interactive Engine Map")}</h2>

      <div
        className="engine-wrapper"
        style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}
      >
        {/* 1. THE IMAGE (Background) - Now with transparent background */}
        <img
          src={engineMain}
          alt="BMW B58 Engine"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: "12px",
          }}
          className="engine-main-image"
        />

        {/* 2. THE OVERLAY (Clickable Hotspots) */}
        <svg
          viewBox="0 0 1000 1250"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* --- MAF (Intake Pipe - Left Side) --- */}
          <g className="sensor-group" onClick={() => handleSensorClick("maf")}>
            <circle
              cx="150"
              cy="500"
              r="30"
              className="sensor-hotspot"
              fill={getSensorColor(sensors.maf.type)}
            />
            <text x="150" y="460" className="sensor-label" fill="white">
              {t("sensors.maf.shortName")}
            </text>
            <line
              x1="150"
              y1="470"
              x2="150"
              y2="500"
              stroke="white"
              strokeWidth="2"
            />
          </g>

          {/* --- THROTTLE (Junction of Pipe and Engine - Center Left) --- */}
          <g className="sensor-group" onClick={handleThrottleClick}>
            <rect
              x="380"
              y="600"
              width="60"
              height="60"
              className="sensor-hotspot"
              fill={getSensorColor(sensors.throttle.type)}
              rx="10"
            />
            <text x="410" y="580" className="sensor-label" fill="white">
              {t("sensors.throttle.shortName")}
            </text>
          </g>

          {/* --- MAP (Top of Manifold - Center) --- */}
          <g className="sensor-group" onClick={() => handleSensorClick("map")}>
            <circle
              cx="550"
              cy="450"
              r="30"
              className="sensor-hotspot"
              fill={getSensorColor(sensors.map.type)}
            />
            <text x="550" y="410" className="sensor-label" fill="white">
              {t("sensors.map.shortName")}
            </text>
            <line
              x1="550"
              y1="420"
              x2="550"
              y2="450"
              stroke="white"
              strokeWidth="2"
            />
          </g>

          {/* --- COOLANT (Front of Block - Bottom Center) --- */}
          <g
            className="sensor-group"
            onClick={() => handleSensorClick("coolant")}
          >
            <circle
              cx="600"
              cy="850"
              r="30"
              className="sensor-hotspot"
              fill={getSensorColor(sensors.coolant.type)}
            />
            <text x="600" y="920" className="sensor-label" fill="white">
              {t("sensors.coolant.shortName")}
            </text>
            <line
              x1="600"
              y1="880"
              x2="600"
              y2="850"
              stroke="white"
              strokeWidth="2"
            />
          </g>

          {/* --- O2 SENSOR (Pre-Catalytic) --- */}
          <g
            className="sensor-group"
            onClick={() => handleSensorClick("o2_pre")}
          >
            <circle
              cx="870"
              cy="520"
              r="25"
              className="sensor-hotspot"
              fill={getSensorColor(sensors.o2_pre.type)}
            />
            <text x="870" y="485" className="sensor-label" fill="white">
              {t("sensors.o2_pre.shortName")}
            </text>
          </g>

          {/* --- O2 SENSOR (Post-Catalytic) --- */}
          <g
            className="sensor-group"
            onClick={() => handleSensorClick("o2_post")}
          >
            <circle
              cx="910"
              cy="620"
              r="25"
              className="sensor-hotspot"
              fill={getSensorColor(sensors.o2_post.type)}
            />
            <text x="910" y="665" className="sensor-label" fill="white">
              {t("sensors.o2_post.shortName")}
            </text>
          </g>
        </svg>
      </div>

      {/* Detail Card Overlay - Shows when sensor is clicked */}
      {selectedSensor && (
        <SensorCard
          sensor={selectedSensor}
          onClose={() => {
            cleanup();
            setSelectedSensor(null);
          }}
        />
      )}

      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <span className="dot input-dot"></span>
          {t("legend.input_sensor", "Input Sensor")}
        </div>
        <div className="legend-item">
          <span className="dot output-dot"></span>
          {t("legend.actuator", "Actuator/Output")}
        </div>
      </div>
    </section>
  );
}
