import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import { setGlobalVar, globalVar } from "db";
import { useNavigate } from "react-router-dom";
import { supabase } from "supabaseClient";

function Header(props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("name, number")
        .eq("email", globalVar)
        .single();

      if (error) {
        console.error("Error fetching user details:", error.message);
      } else {
        setUserName(data.name);
        setUserNumber(data.number);
      }
    };

    fetchUserDetails();
  }, []);

  // Function to toggle dropdown visibility
  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // Closes dropdown if user clicks outside
  const handleLogout = async () => {
    setGlobalVar("");  // Clear user data
    setIsOpen(false);  // Close dropdown
    navigate("/", { replace: true });  // Redirect properly
    window.location.reload(); // Force UI update if needed
  };

  return (
    <div className={styles.searchToolbox}>
      <div className={styles.row5}>
        <div className={styles.userDetails}>
          <div className={styles.userProfile} ref={dropdownRef}>
            <div className={styles.userIcon} onClick={toggleDropdown}>
              {userName ? userName.charAt(0).toUpperCase() : "U"}
            </div>

            {isOpen && (
              <div className={styles.dropdownMenu}>
                <ul>
                  <li>
                    <img className={styles.settingsIcon1} src={"/assets/42c00a9355f73928c69d06a8a8bc775c.svg"} alt="alt text" />
                    <a href="/">Settings</a>
                  </li>
                  <li>
                    <img className={styles.notificationIcon} src={"/assets/5c3de22dde775d9719fce3167251562b.svg"} alt="alt text" />
                    <a href="/">Notifications</a>
                  </li>
                  <li>
                    <button className={styles.logoutButton} onClick={handleLogout}>
                      <img className={styles.settingsIcon1} src={"/assets/logout (1).png"} alt="Logout" />
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className={styles.detailsCol}>
            <div className={styles.detailsTitle}>
              {userName}
            </div>
            <div className={styles.detailsNum}>
              {"+91 "+userNumber}
            </div>
          </div>
        </div>
        <button className={styles.block4}>
          <img className={styles.searchIcon} src={"/assets/search_icon.svg"} alt="alt text" />
          <button className={styles.searchBtn}>Search</button>
        </button>
      </div>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;