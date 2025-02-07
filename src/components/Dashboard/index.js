import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import { BarChart , BarPlot, PieChart } from '@mui/x-charts';
import { ChartContainer } from '@mui/x-charts';

const chartSetting = {
  xAxis: [
    {
      id: 'barCategories',
      data: ['bar A', 'bar B', 'bar C','bar D', 'bar E','bar F'],
      scaleType: 'band',
    },
  ],
  width: 400,
  height: 400,
};
function Dashboard(props) {
  return (
    
    
    <section className={cn(styles.containerSection, props.className, 'forms')}>
      {/* Main content wrap section */}

      <div className={styles.contentBlock}>
        {/* Container for main content */}

        <Sidebar />

        <section className={styles.mainContentSection}>
          {/* Main section for portfolio and search */}
          <Header />

          <div className={styles.portfolioContent}>
            {/* User portfolios and related action section */}
            <article className={styles.portfolioTitle}>My Portfolio’s</article>

            <div className={styles.portfolioItem}>
              <div className={styles.incomeBlock}>
                <div className={styles.incomeChart}>
                    Income
                  <ChartContainer
                    series={[{ data: [2, 5, 3,5,8,9],label: 'uv', type: 'bar'}]}
                    {...chartSetting}
                  >
                    <BarPlot/>
                    </ChartContainer>
                  
                </div>
                <div className={styles.incomeAmtBrk}>
                  <div className={styles.incomeTitle} id='professional'>
                    <div className={styles.incomeDetails}>Professional</div>
                    <div className={styles.incomeAmount}>$ 0.00</div>
                  </div>
                  <div className={styles.incomeTitle} id='others'>
                    <div className={styles.incomeDetails}>Investment </div>
                    <div className={styles.incomeAmount}>$ 0.00</div>
                  </div>
                  <div className={styles.incomeTitle} id='investment'>
                    <div className={styles.incomeDetails}>Others</div>
                    <div className={styles.incomeAmount}>$ 0.00</div>
                  </div>
                </div>
              </div>
              <div className={styles.expenseBlock}>
                <div className={styles.expenseTitle}>
                <ChartContainer
                    series={[{ data: [2, 5, 3,5,8,9],label: 'Expenses', type: 'bar'}]}
                    {...chartSetting}
                  >
                    <BarPlot/>
                    </ChartContainer>
                  Expenses
                </div>
                <div className={styles.expenseAmount}>
                <div className={styles.incomeTitle} id='professional'>
                    <div className={styles.incomeDetails}>House</div>
                    <div className={styles.incomeAmount}>$ 0.00</div>
                  </div>
                  <div className={styles.incomeTitle} id='others'>
                    <div className={styles.incomeDetails}>Living</div>
                    <div className={styles.incomeAmount}>$ 0.00</div>
                  </div>
                  <div className={styles.incomeTitle} id='investment'>
                    <div className={styles.incomeDetails}>Going around</div>
                    <div className={styles.incomeAmount}>$ 0.00</div>
                  </div>
                </div>
              </div>
              <div className={styles.chartBlock}>
              <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: 'series A' },
                        { id: 1, value: 15, label: 'series B' },
                        { id: 2, value: 20, label: 'series C' },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
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
