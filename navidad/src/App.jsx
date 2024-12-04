import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Countdown from "./components/Countdown";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countdown" element={<Countdown />} />
      </Routes>
    </Router>
  );
}

export default App;
