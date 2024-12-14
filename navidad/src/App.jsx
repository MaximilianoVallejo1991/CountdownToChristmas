import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Countdown from "./components/Countdown";
import MerryChristmas from "./components/MerryChristmas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countdown" element={<Countdown />} />
        <Route path="/MerryChristmas" element={<MerryChristmas />} />
      </Routes>
    </Router>
  );
}

export default App;
