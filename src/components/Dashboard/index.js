import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import { supabase } from 'supabaseClient';
import { globalVar } from 'db';
import { Grid, CircularProgress, Typography, Paper, useMediaQuery, useTheme } from '@mui/material';
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
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
  const [monthlyCashFlow, setMonthlyCashFlow] = useState({
    income: 0,
    expenses: 0,
    cashFlow: 0,
  });
  const [portfolioAllocation, setPortfolioAllocation] = useState([]);
  const [investmentPerformance, setInvestmentPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6384', '#36A2EB', '#FFCE56'];
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p>{label}</p>
          <p>{formatIndianNumber(payload[0].value)}</p>
          
        </div>
      );
    }
    return null;
  };
  const formatIndianNumber = (num) => {
    if (typeof num !== 'number') return '0';

    const absoluteNum = Math.abs(num);
    const suffixes = ['', 'K', 'L', 'Cr'];
    const divisors = [1, 1e3, 1e5, 1e7];

    // Find the appropriate divisor index
    let divisorIndex = 0;
    for (let i = divisors.length - 1; i >= 0; i--) {
      if (absoluteNum >= divisors[i] && divisors[i] !== 0) {
        divisorIndex = i;
        break;
      }
    }

    const divisor = divisors[divisorIndex];
    const formattedValue = absoluteNum / divisor;

    // Round to nearest 0.1 decimal
    const roundedValue = Math.round(formattedValue * 10) / 10;

    // Remove .0 if no decimal needed
    const valueString = roundedValue % 1 === 0
      ? roundedValue.toFixed(0)
      : roundedValue.toFixed(1);

    return `₹${num < 0 ? '-' : ''}${valueString}${suffixes[divisorIndex]}`;
    // Formats the number in the Indian numbering system
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('setValue, existing_investments,professionalIncome,otherIncome,insurancePremium,ongoingSavings,loan,houseRent,electricityBills,telephoneBills,grocery,medicine,educationFees,houseHelp,socialCause,entertainment')
        .eq('email', globalVar)
        .single();

      if (error) {
        console.error(error);
      } else {
        const monthlyIncome = parseFloat(data.professionalIncome + data.otherIncome + data.ongoingSavings || 0);
        const monthlyExpenses = parseFloat(data.insurancePremium + data.loan + data.houseRent + data.houseHelp + data.electricityBills + data.telephoneBills + data.grocery + data.medicine + data.educationFees + data.socialCause + data.entertainment || 0);
        const cashFlow = monthlyIncome - monthlyExpenses;
        setMonthlyCashFlow({
          income: monthlyIncome,
          expenses: monthlyExpenses,
          cashFlow: cashFlow,
        });
        setLoading(false);
        setValueFilled(data.setValue);
        setFormData(data.existing_investments);

        // Calculate current net worth from existing investments
        const investments = data.existing_investments || {};
        let currentNetWorth = 0;

        Object.values(investments).forEach((category) => {
          category.forEach((investment) => {
            const value = parseFloat(investment.invested_amount || investment.property_value || 0);
            currentNetWorth += value;
          });
        });

        // Define growth rates for projections
        const growthRates = {
          Equity: 0.1, // 10% annual growth
          'Fixed-Income': 0.05, // 5% annual growth
          'Real Estate': 0.07, // 7% annual growth
          Commodities: 0.03, // 3% annual growth
        };

        // Calculate projections for 5, 10, and 20 years
        const calculateProjection = (years) => {
          let projectedValue = 0;

          Object.entries(investments).forEach(([category, items]) => {
            const growthRate = growthRates[category] || 0.02; // Default growth rate: 2%
            items.forEach((investment) => {
              const value = parseFloat(investment.invested_amount || investment.property_value || 0);
              projectedValue += value * Math.pow(1 + growthRate, years);
            });
          });

          return projectedValue;
        };

        const after5Years = calculateProjection(5);
        const after10Years = calculateProjection(10);
        const after20Years = calculateProjection(20);

        // Update projections state
        const transformedProjections = [
          { year: 'Now', value: currentNetWorth },
          { year: '5 Years', value: after5Years },
          { year: '10 Years', value: after10Years },
          { year: '20 Years', value: after20Years },
        ];

        setProjections(transformedProjections);

        // Calculate Portfolio Allocation
        const portfolioAllocation = [];
        Object.entries(investments).forEach(([category, items]) => {
          const totalCategoryValue = items.reduce((sum, investment) => {
            return sum + parseFloat(investment.invested_amount || investment.property_value || 0);
          }, 0);

          const percentage = ((totalCategoryValue / currentNetWorth) * 100).toFixed(2);
          portfolioAllocation.push({ name: category, value: parseFloat(percentage) });
        });

        setPortfolioAllocation(portfolioAllocation);

        // Calculate Annual Returns
        const annualReturns = [];
        Object.entries(investments).forEach(([category, items]) => {
          const totalCategoryValue = items.reduce((sum, investment) => {
            return sum + parseFloat(investment.invested_amount || investment.property_value || 0);
          }, 0);

          const returnRate = growthRates[category] || 0.02; // Default return rate: 2%
          const annualReturn = (totalCategoryValue * returnRate).toFixed(2);
          annualReturns.push({ name: category, returns: parseFloat(annualReturn) });
        });

        setInvestmentPerformance(annualReturns);
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
          {loading ? (
            <div className={styles.loadingContainer}>
              <CircularProgress size={60} />
            </div>
          ) : valueFilled ? (
            <Grid container spacing={3}>
              {/* Net Worth Overview */}
              <Grid item xs={12} lg={8}>
                <Paper className={styles.paper}>
                  <div variant="h6" gutterBottom className={styles.chartTitle}>
                    Net Worth Projection
                  </div>
                  <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={projections}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => formatIndianNumber(value)} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#8884d8"
                          strokeWidth={2}
                          dot={{ fill: '#8884d8', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Paper>
              </Grid>

              {/* Portfolio Allocation */}
              <Grid item xs={12} lg={4}>
                <Paper className={styles.paper}>
                  <div className={styles.chartTitle}>
                    Portfolio Allocation
                  </div>
                  <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={portfolioAllocation}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          innerRadius={50}
                          paddingAngle={5}
                          label
                        >
                          {portfolioAllocation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                          layout={isMobile ? 'horizontal' : 'vertical'}
                          align="right"
                          verticalAlign="middle"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Paper>
              </Grid>

              {/* Investment Performance */}
              <Grid item xs={12} md={6}>
                <Paper className={styles.paper}>
                  <div variant="h6" gutterBottom className={styles.chartTitle}>
                    Annual Returns
                  </div>
                  <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={investmentPerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => formatIndianNumber(value)} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar
                          dataKey="returns"
                          fill="#82ca9d"
                          radius={[4, 4, 0, 0]}
                          animationDuration={500}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Paper>
              </Grid>


              <Grid item xs={12} md={6}>
                <Paper className={styles.paper}>
                  <Typography variant="h6" gutterBottom className={styles.chartTitle}>
                    Monthly Cash Flow
                  </Typography>
                  <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={[
                          { name: 'Income', value: monthlyCashFlow.income },
                          { name: 'Expenses', value: monthlyCashFlow.expenses },
                          { name: 'Cash Flow', value: monthlyCashFlow.cashFlow },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => formatIndianNumber(value)} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Paper>
              </Grid>

              {/* Projections Grid */}
              <Grid item xs={12}>
                <Paper className={styles.paper}>
                  <div variant="h6" gutterBottom>
                    Financial Projections
                  </div>
                  <Grid container spacing={2}>
                    {projections.map((projection) => (
                      <Grid item xs={6} sm={3} key={projection.year}>
                        <div className={styles.projectionCard}>
                          <Typography variant="subtitle2" className={styles.projectionLabel}>
                            {projection.year}
                          </Typography>
                          <Typography variant="h5" className={styles.projectionValue}>
                            ₹{projection.value.toLocaleString()}
                          </Typography>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
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


