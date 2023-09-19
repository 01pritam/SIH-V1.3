import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Projects from "./components/projects/Projects";
import Navbar from "./components/navbar/Navbar";
import ContestPage from "./components/contest/Contest";
import ContactUs from "./components/Contact Us/Contact"; // Updated import
import Profile from "./components/profile/Profile";
import Register from "./components/register/Register";

function App() {
  const [loginUser, setLoginUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Get the auth token from local storage when the component mounts
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <Router>
      {authToken && <Navbar authToken={authToken} />} {/* Render Navbar conditionally */}
      <Routes>
        {/* Redirect to login if not authenticated */}
        <Route
          path="/"
          element={authToken ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={
            authToken ? (
              <Navigate to="/" replace />
            ) : (
              <Login setLoginUser={setLoginUser} setAuthToken={setAuthToken} />
            )
          }
        />

        <Route path="/projects" element={<Projects authToken={authToken} />} />
        <Route path="/contests" element={<ContestPage authToken={authToken}/>} />
        <Route path="/contact" element={<ContactUs authToken={authToken}/>} /> {/* Added ContactUs route */}
        <Route path="/profile" element={<Profile authToken={authToken}/>} /> {/* Added ContactUs route */}
        <Route path="/register" element={<Register authToken={authToken}/>} /> {/* Added ContactUs route */}
        
      </Routes>
    </Router>
  );
}

export default App;
