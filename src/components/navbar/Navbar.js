
// export default Navbar;
import React, { useState } from "react";
import "./navbar.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
  FaUser,
  FaSignOutAlt, // Import the logout icon
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const Navbar = ({ authToken }) => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  const toggleMediaIcons = () => {
    setShowMediaIcons(!showMediaIcons);
  };

  const handleLogout = () => {
    // Remove the JWT token from local storage and reload the page
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part */}
        <div className="logo">
          <h2>
          <span>I</span>nno
            <span>Gen</span>
          </h2>
        </div>

        {/* 2nd menu part */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
            <li>
              <NavLink exact to="/" onClick={toggleMediaIcons}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" onClick={toggleMediaIcons}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/contests" onClick={toggleMediaIcons}>
                Contests
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts" onClick={toggleMediaIcons}>
                Contacts
              </NavLink>
            </li>
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              <a href="#">
                <FaFacebookSquare className="facebook" />
              </a>
            </li>
            <li>
              <a href="#">
                <FaInstagramSquare className="instagram" />
              </a>
            </li>
            <li>
              <a href="#">
                <FaYoutubeSquare className="youtube" />
              </a>
            </li>
            {authToken && (
              <>
                {/* Display the user profile icon when authToken is available */}
                <li>
                  <NavLink to="/profile" onClick={toggleMediaIcons}>
                    <FaUser className="user-profile" />
                  </NavLink>
                </li>
                {/* Display the logout button when authToken is available */}
                <li>
                  <a href="#" onClick={handleLogout}>
                    <FaSignOutAlt className="logout" />
                  </a>
                </li>
              </>
            )}
          </ul>

          {/* hamburger menu */}
          <div className="hamburger-menu">
            <a href="#" onClick={toggleMediaIcons}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
  window.location.reload();
};

export default Navbar;
