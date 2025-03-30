import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import { supabase } from 'supabaseClient';
import { globalVar } from 'db';
import { Grid, CircularProgress, Typography, Paper } from '@mui/material';
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Link } from 'react-router-dom';
function Dashboard(props) {
  const [valueFilled, setValueFilled] = useState(false);
  const [formData, setFormData] = useState({});
  const [projections, setProjections] = useState({
    currentNetWorth: 0,
    after5Years: 0,
    after10Years: 0,
    after20Years: 0,
  });

  const [portfolioAllocation, setPortfolioAllocation] = useState([]);
  const [investmentPerformance, setInvestmentPerformance] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6384', '#36A2EB', '#FFCE56'];

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('setValue, existing_investments').eq('email', globalVar).single();
      if (error) {
        console.error(error);
      } else {
        setValueFilled(data.setValue);
        setFormData(data.existing_investments);

        // Example: Populate portfolio allocation and investment performance
        setPortfolioAllocation([
          { name: 'Equity', value: 40 },
          { name: 'Fixed-Income', value: 30 },
          { name: 'Real Estate', value: 20 },
          { name: 'Commodities', value: 10 },
        ]);

        setInvestmentPerformance([
          { name: 'Equity', returns: 15 },
          { name: 'Fixed-Income', returns: 7 },
          { name: 'Real Estate', returns: 5 },
          { name: 'Commodities', returns: 4 },
        ]);

        // Example: Populate projections
        setProjections({
          currentNetWorth: 1000000,
          after5Years: 1500000,
          after10Years: 2500000,
          after20Years: 5000000,
        });
      }
    };
    fetchUsers();
  }, []);

  return (
    <section className={cn(styles.containerSection, props.className, 'dashboard')}>
      <div className={styles.contentBlock}>
        <Sidebar />
        <section className={styles.mainContentSection}>
          <Header />
          {valueFilled ? (
            <Grid container spacing={3}>
              {/* Net Worth Overview */}
              <Grid item xs={12} md={6}>
                <Paper className={styles.paper}>
                  <Typography variant="h6" gutterBottom>
                    Net Worth Overview
                  </Typography>
                  <LineChart width={400} height={250} data={[
                    { year: 'Now', value: projections.currentNetWorth },
                    { year: '5 Years', value: projections.after5Years },
                    { year: '10 Years', value: projections.after10Years },
                    { year: '20 Years', value: projections.after20Years },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </Paper>
              </Grid>

              {/* Portfolio Allocation */}
              <Grid item xs={12} md={6}>
                <Paper className={styles.paper}>
                  <Typography variant="h6" gutterBottom>
                    Portfolio Allocation
                  </Typography>
                  <PieChart width={400} height={250}>
                    <Pie
                      data={portfolioAllocation}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {portfolioAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </Paper>
              </Grid>

              {/* Investment Performance */}
              <Grid item xs={12} md={6}>
                <Paper className={styles.paper}>
                  <Typography variant="h6" gutterBottom>
                    Investment Performance
                  </Typography>
                  <BarChart width={400} height={250} data={investmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="returns" fill="#82ca9d" />
                  </BarChart>
                </Paper>
              </Grid>

              {/* Emergency Fund Status */}
              <Grid item xs={12} md={6}>
                <Paper className={styles.paper}>
                  <Typography variant="h6" gutterBottom>
                    Emergency Fund Status
                  </Typography>
                  <CircularProgress variant="determinate" value={75} size={100} />
                  <Typography variant="body1">75% of Emergency Fund Achieved</Typography>
                </Paper>
              </Grid>

              {/* Projections */}
              <Grid item xs={12}>
                <Paper className={styles.paper}>
                  <Typography variant="h6" gutterBottom>
                    Financial Projections
                  </Typography>
                  <Typography>Current Net Worth: ₹{projections.currentNetWorth}</Typography>
                  <Typography>After 5 Years: ₹{projections.after5Years}</Typography>
                  <Typography>After 10 Years: ₹{projections.after10Years}</Typography>
                  <Typography>After 20 Years: ₹{projections.after20Years}</Typography>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <>
              <div className={styles.overlay}></div>
              <div className={styles.modal}>
                <h2>Welcome!</h2>
                <p>You look new here. Let's start with getting to know you.</p>
                <Link to="/Form">
                  <button className={styles.startButton}>Get Started</button>
                </Link>
              </div>
            </>
          )}
        </section>
      </div>
    </section>
  );
}

Dashboard.propTypes = {
  className: PropTypes.string,
};

export default Dashboard;