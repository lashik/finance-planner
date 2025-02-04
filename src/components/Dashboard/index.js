import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import Sidebar from 'components/Sidebar';

function Dashboard(props) {
  return (
    <section className={cn(styles.containerSection, props.className, 'forms')}>
      {/* Main content wrap section */}

      <div className={styles.contentBlock}>
        {/* Container for main content */}

        <Sidebar/>

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
                  <Link to="/Portfolio"><article className={styles.portfolioName}>Kashik’s</article></Link>
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

Dashboard.propTypes = {
  className: PropTypes.string
};

export default Dashboard;
