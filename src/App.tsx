import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import "./styles/theme.css";

function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="page">
      <header className="header">
        <h1>{t("about.title")}</h1>
        <p>{t("about.subtitle")}</p>
      </header>
      <section
        style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}
      >
        <h2>{t("about.educationalPurpose")}</h2>
        <p style={{ lineHeight: 1.8, color: "var(--text-secondary)" }}>
          {t("about.educationalText")}
        </p>

        <h2 style={{ marginTop: "40px" }}>{t("about.keyFeatures")}</h2>
        <ul style={{ lineHeight: 1.8, color: "var(--text-secondary)" }}>
          <li>{t("about.feature1")}</li>
          <li>{t("about.feature2")}</li>
          <li>{t("about.feature3")}</li>
          <li>{t("about.feature4")}</li>
          <li>{t("about.feature5")}</li>
        </ul>
      </section>
    </div>
  );
}

function App() {
  // 1. Initialize state from localStorage (saves preference on refresh)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // 2. Effect: Apply the theme attribute to the <body> tag whenever state changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 3. Toggle Function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
