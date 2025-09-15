import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { WeatherProvider } from "./context/WeatherContext";
// import NotFound from "./pages/NotFound";

function App() {
  return (
    <WeatherProvider>


      {/* the children of weather context that are using */}
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
