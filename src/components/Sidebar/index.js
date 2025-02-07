import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import styles from './index.module.scss';

function Sidebar(props) {
  return (
    <div className={styles.headerSection}>
      {/* Header section for site title and navigation */}

      <div className={styles.headerContainer}>
        {/* Wrap for header items */}

        <div className={styles.brandingBlock}>
          <div className={styles.brandingRow}>
            <img
              className={styles.companyLogo}
              src={'/assets/891b6c13b0d25bd9e7ffb88860b74834.png'}
              alt="alt text"
            />
            <figcaption className={styles.siteTitle}>
              {/* Site branding title */}
              FinanceGenius
            </figcaption>
            <img
              className={styles.secondaryLogo}
              src={'/assets/32788402074d79ea96d7cd533f8da95e.svg'}
              alt="alt text"
            />
          </div>
        </div>

        <nav className={styles.navigationBar}>
          {/* Main navigation bar */}

          <div className={styles.mainNavSection}>
            {/* Contains main navigation links */}
            <p className={styles.navTitle}>Main</p>
            <div className={styles.portfolioNavItem}>
              <img
                className={styles.portfolioIcon}
                src={'/assets/dashboard.png'}
                alt="alt text"
              />
              <Link className={styles.portfolioLink} to={'/Dashboard'}>Dashboard</Link>
            </div>
            <div className={styles.portfolioNavItem}>
              <img
                className={styles.Icon}
                src={'/assets/profile (1).png'}
                alt="alt text"
              />
              <Link className={styles.portfolioLink} to={'/Form'}>Personal Details</Link>
            </div>
            <div className={styles.portfolioNavItem}>
              <img
                className={styles.portfolioIcon}
                src={'/assets/goal.png'}
                alt="alt text"
              />
              <Link className={styles.portfolioLink} to={'/Portfolio'}>Goal Setting</Link>
            </div>
            <div className={styles.portfolioNavItem}>
              <img
                className={styles.portfolioIcon}
                src={'/assets/warning.png'}
                alt="alt text"
              />
              <Link className={styles.portfolioLink} to={'/Portfolio'}>Risk adjustments</Link>
            </div>
            <div className={styles.portfolioNavItem}>
              <img
                className={styles.portfolioIcon}
                src={'/assets/investment.png'}
                alt="alt text"
              />
              <Link className={styles.portfolioLink} to={'/Portfolio'}>Portfolio's</Link>
            </div>
          </div>



          {/* <div className={styles.incomeNavBlock}>
                <div className={styles.incomeNavItem}>
                  <img
                    className={styles.incomeIcon}
                    src={'/assets/6dc0e95898f1ae01c1e34e75693d8374.svg'}
                    alt="alt text"
                  />
                  <a className={styles.incomeLink}>Income</a>
                  <img
                    className={styles.settingsIcon}
                    src={'/assets/c48bd4359c7bb421eaec3323b924577a.svg'}
                    alt="alt text"
                  />
                </div>
              </div> */}

          {/* <div className={styles.earningsSection}>
                {/* Earnings related information 
                <div className={styles.divider} />

                <div className={styles.earningsInfo}>
                  <p className={styles.earningsText}>
                    {/* Earnings title 
                    Earnings
                  </p>
                  <p className={styles.refundsText}>
                    {/* TODO 
                    Refunds
                  </p>
                  <p className={styles.declinesText}>Declines</p>
                  <p className={styles.payoutsText}>Payouts</p>
                </div>
              </div> */}

          
        </nav>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string
};

export default Sidebar;
