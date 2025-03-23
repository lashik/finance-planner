import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.scss';

function Sidebar(props) {
  const location = useLocation(); // Get the current location

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.headerSection}>
      <div className={styles.headerContainer}>
        <div className={styles.brandingBlock}>
          <div className={styles.brandingRow}>
            <div className={`${styles.companyLogo} ${styles.logo}`} />
            <figcaption className={styles.siteTitle}>
              FinanceGenius
            </figcaption>
          </div>
        </div>

        <nav className={styles.navigationBar}>
          <div className={styles.mainNavSection}>
            
            <div
              className={`${styles.portfolioNavItem} ${
                isActive('/Dashboard') ? styles.activeNavItem : ''
              }`}
            >
              <div className={`${styles.portfolioIcon} ${styles.dashboardIcon}`} />
              <Link className={styles.portfolioLink} to={'/Dashboard'}>
                Dashboard
              </Link>
            </div>
            <div
              className={`${styles.portfolioNavItem} ${
                isActive('/Form') ? styles.activeNavItem : ''
              }`}
            >
              <div className={`${styles.portfolioIcon} ${styles.profileIcon}`} />
              <Link className={styles.portfolioLink} to={'/Form'}>
                Personal Details
              </Link>
            </div>
            <div
              className={`${styles.portfolioNavItem} ${
                isActive('/Portfolio') ? styles.activeNavItem : ''
              }`}
            >
              <div className={`${styles.portfolioIcon} ${styles.investmentIcon}`} />
              <Link className={styles.portfolioLink} to={'/Portfolio'}>
                Add/Edit Portfolio
              </Link>
            </div>
            <div
              className={`${styles.portfolioNavItem} ${
                isActive('/Goal') ? styles.activeNavItem : ''
              }`}
            >
              <div className={`${styles.portfolioIcon} ${styles.goalIcon}`} />
              <Link className={styles.portfolioLink} to={'/Goal'}>
                Goal Setting
              </Link>
            </div>
            <div
              className={`${styles.portfolioNavItem} ${
                isActive('/Risk') ? styles.activeNavItem : ''
              }`}
            >
              <div className={`${styles.portfolioIcon} ${styles.warningIcon}`} />
              <Link className={styles.portfolioLink} to={'/Risk'}>
                Risk Adjustments
              </Link>
            </div>
            <div
              className={`${styles.portfolioNavItem} ${
                isActive('/Projections') ? styles.activeNavItem : ''
              }`}
            >
              <div className={`${styles.portfolioIcon} ${styles.investmentIcon}`} />
              <Link className={styles.portfolioLink} to={'/Projections'}>
                Portfolio's
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;