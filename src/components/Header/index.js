import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import { setGlobalVar, globalVar } from "db";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Closes dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Attach event listener once when mounted
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setGlobalVar("");
    window.location.href = "/";
  };

  return (
    <div className={styles.searchToolbox}>
      <div className={styles.row5}>
        <img className={styles.image2} src={"/assets/horizontal_logo.png"} alt="alt text" />

        <button className={styles.block4}>
          <img className={styles.searchIcon} src={"/assets/search_icon.svg"} alt="alt text" />
          <button className={styles.searchBtn}>Search</button>
        </button>

        

        {/* User Profile Dropdown */}
        <div className={styles.userProfile} ref={dropdownRef}>
          <div className={styles.userIcon} onClick={toggleDropdown}>
            {globalVar.charAt(0).toUpperCase()}
          </div>
          {isOpen && (
            <div className={styles.dropdownMenu}>
              <ul>
                <li>
                <img className={styles.settingsIcon1} src={"/assets/42c00a9355f73928c69d06a8a8bc775c.svg"} alt="alt text" />
                <a href="#">Settings</a></li>
                <li>
                <img className={styles.notificationIcon} src={"/assets/5c3de22dde775d9719fce3167251562b.svg"} alt="alt text" /><a href="#">Notifications</a></li>
                <li>
                <img className={styles.settingsIcon1} src={"/assets/logout (1).png"} alt="alt text" /><button  onClick={handleLogout}>Log Out</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
