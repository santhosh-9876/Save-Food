import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import MyNavbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MyProfile from "./Components/MyProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import Donor from "./Food/Donor";
import Claim from "./Food/Claim";
import AvailableFood from "./Food/AvailableFood";

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="donor/" element={<Donor />} />
        <Route path="available-food/" element={<AvailableFood />} />
        <Route path="claim/" element={<Claim />} />
        <Route path="my-profile/" element={<MyProfile />} />

        {/* Fallback - redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
