import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import { BarChart , BarPlot, PieChart } from '@mui/x-charts';
import { ChartContainer } from '@mui/x-charts';
import { supabase } from 'supabaseClient';
import { useEffect } from 'react';
import { globalVar, setGlobalVar } from 'db';
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
  const [valueFilled, setValueFilled] = React.useState(false);
  function handleNav(){
    window.location.href = "/Form";
  }
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*').eq('email', globalVar);
      if (error) {
        console.error(error);
      }
      else if (data[0].setValue==false){
        setValueFilled(false);
      }
      else{
        setValueFilled(true);
      }
    }
  }
, []);
        
  return (
    
    
    <section className={cn(styles.containerSection, props.className, 'forms')}>
      {/* Main content wrap section */}

      <div className={styles.contentBlock}>
        {/* Container for main content */}

        <Sidebar />

        <section className={styles.mainContentSection}>
          {/* Main section for portfolio and search */}
          <Header />
          { valueFilled ? (
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
                  sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}
                />
              </div>
            </div>
          </div>
          ):(
            <div className={styles.portfolioContent} onClick={handleNav}>
              First time? Fill your Income and expenses to get started
            </div>
          )
}
        </section>
      </div>
    </section>
  );
}

Dashboard.propTypes = {
  className: PropTypes.string
};

export default Dashboard;
