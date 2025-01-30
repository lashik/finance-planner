import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './index.module.scss';

function Forms(props) {
  return (
    <section className={cn(styles.containerSection, props.className, 'forms')}>
      {/* Main content wrap section */}

      <div className={styles.contentBlock}>
        {/* Container for main content */}

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

                <div className={styles.navItem}>
                  <img
                    className={styles.navIcon}
                    src={'/assets/2e88fcb844a182e84e257ae1b9b1b2b6.svg'}
                    alt="alt text"
                  />
                  <a className={styles.scheduleLink}>Schedules</a>
                </div>
              </div>

              <div className={styles.portfolioNavItem}>
                <img
                  className={styles.portfolioIcon}
                  src={'/assets/2e88fcb844a182e84e257ae1b9b1b2b6.svg'}
                  alt="alt text"
                />
                <a className={styles.portfolioLink}>Portfolios</a>
              </div>

              <div className={styles.incomeNavBlock}>
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
              </div>

              <div className={styles.earningsSection}>
                {/* Earnings related information */}
                <div className={styles.divider} />

                <div className={styles.earningsInfo}>
                  <p className={styles.earningsText}>
                    {/* Earnings title container */}
                    Earnings
                  </p>
                  <p className={styles.refundsText}>
                    {/* TODO */}
                    Refunds
                  </p>
                  <p className={styles.declinesText}>Declines</p>
                  <p className={styles.payoutsText}>Payouts</p>
                </div>
              </div>

              <article className={styles.settingsArticle}>Settings</article>

              <div className={styles.notificationNavItem}>
                <img
                  className={styles.notificationIcon}
                  src={'/assets/5c3de22dde775d9719fce3167251562b.svg'}
                  alt="alt text"
                />
                <a className={styles.notificationLink}>Notification</a>
              </div>

              <div className={styles.settingsNavItem}>
                <img
                  className={styles.settingsIcon1}
                  src={'/assets/42c00a9355f73928c69d06a8a8bc775c.svg'}
                  alt="alt text"
                />
                <a className={styles.settingsLink}>Settings</a>
                <img
                  className={styles.extraSettingsIcon}
                  src={'/assets/51391c1e48932f0aaa2d6238b31c5986.svg'}
                  alt="alt text"
                />
              </div>
            </nav>
          </div>
        </div>

        <section className={styles.mainContentSection}>
          {/* Main section for portfolio and search */}

          <div className={styles.searchBlock}>
            {/* Search functionality block */}

            <div className={styles.searchRow}>
              <img
                className={styles.searchLogo}
                src={'/assets/765d4746d81e03a06500e5692ea132ab.png'}
                alt="alt text"
              />

              <button className={styles.searchBtn}>
                {/* TODO */}
                <img
                  className={styles.searchIcon}
                  src={'/assets/0ab9176ee42535cf4c9aff81f7a7a19d.svg'}
                  alt="alt text"
                />
                <p className={styles.searchText}>Search</p>
              </button>
            </div>
          </div>

          <div className={styles.portfolioContent}>
            {/* User portfolios and related action section */}
            <article className={styles.portfolioTitle}>My Portfolio’s</article>

            <div className={styles.portfolioItem}>
              <Link to="/Form"><img
                className={styles.portfolioImage}
                src={'/assets/5aa6e120316d40414912909a07956654.svg'}
                alt="alt text"
              /></Link>

              <div className={styles.portfolioBlock}>
                {/* Details of each portfolio */}

                <div className={styles.portfolioRow}>
                  <div className={styles.portfolioInfo}>
                    <article className={styles.portfolioName}>Kashik’s</article>
                    <p className={styles.incomeInfo}>Income: 10000</p>
                    <p className={styles.expenseInfo}>Expenses: 10000</p>
                  </div>

                  <img
                    className={styles.incomeChartImage}
                    src={'/assets/bf6ba2d18da2b0857e3169ea679b2880.svg'}
                    alt="alt text"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

Forms.propTypes = {
  className: PropTypes.string
};

export default Forms;
