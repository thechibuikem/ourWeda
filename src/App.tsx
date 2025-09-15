import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Preloader from "./pages/Preloader";
import { WeatherProvider } from "./context/WeatherContext";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate loading for 2 seconds (you can remove timeout later)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <WeatherProvider>
      {loading ? (
        <Preloader />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      )}
    </WeatherProvider>  
  );
}

export default App;
