import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Body from "./components/Body";
import { ToastContainer } from "react-toastify";
import Profile from "./components/body/Profile";
import Alumni from "./components/body/Alumni";
import DetailPage from "./components/body/DetailPage";

function App() {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer  position="bottom-right"/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Body />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/details" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
