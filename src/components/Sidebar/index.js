import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

function Sidebar(props) {
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
            <p className={styles.navTitle}>Main</p>
            <div className={styles.portfolioNavItem}>
              <div className={`${styles.portfolioIcon} ${styles.dashboardIcon}`} />
              <Link className={styles.portfolioLink} to={'/Dashboard'}>Dashboard</Link>
            </div>
            <div className={styles.portfolioNavItem}>
              <div className={`${styles.portfolioIcon} ${styles.profileIcon}`} />
              <Link className={styles.portfolioLink} to={'/Form'}>Personal Details</Link>
            </div>
            <div className={styles.portfolioNavItem}>
              <div className={`${styles.portfolioIcon} ${styles.goalIcon}`} />
              <Link className={styles.portfolioLink} to={'/Portfolio'}>Goal Setting</Link>
            </div>
            <div className={styles.portfolioNavItem}>
              <div className={`${styles.portfolioIcon} ${styles.warningIcon}`} />
              <Link className={styles.portfolioLink} to={'/Portfolio'}>Risk adjustments</Link>
            </div>
            <div className={styles.portfolioNavItem}>
              <div className={`${styles.portfolioIcon} ${styles.investmentIcon}`} />
              <Link className={styles.portfolioLink} to={'/Portfolio'}>Portfolio's</Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string
};

export default Sidebar;