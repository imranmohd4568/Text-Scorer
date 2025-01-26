import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import LandingPage from "./pages/LandingPage"; 
import AnalyzePage from "./pages/AnalyzePage"; 
import HistoryPage from "./pages/HistoryPage"; 

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? "bg-gradient-to-r from-gray-700 via-blue-700 to-gray-700" : "bg-gradient-to-r from-cyan-100 via-blue-300 to-indigo-400"}`}>
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<LandingPage isDarkMode={isDarkMode} />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
