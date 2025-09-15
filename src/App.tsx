import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { WeatherProvider } from "./context/WeatherContext";
import { useEffect } from "react";

function App() {
// removing preloader from html if react has umnounted
useEffect(() => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
}, []);

  return (
    <WeatherProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
    </WeatherProvider>  
  );
}

export default App;
