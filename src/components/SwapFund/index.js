import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Slider, Button, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PropTypes from 'prop-types';
import { supabase } from 'supabaseClient';
import styles from './index.module.scss';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import { globalVar } from 'db';

const formatIndianNumber = (num) => {
  if (typeof num !== 'number') return '0';

  const absoluteNum = Math.abs(num);
  const suffixes = ['', 'K', 'L', 'Cr'];
  const divisors = [1, 1e3, 1e5, 1e7];

  let divisorIndex = 0;
  for (let i = divisors.length - 1; i >= 0; i--) {
    if (absoluteNum >= divisors[i] && divisors[i] !== 0) {
      divisorIndex = i;
      break;
    }
  }

  const divisor = divisors[divisorIndex];
  const formattedValue = absoluteNum / divisor;
  const roundedValue = Math.round(formattedValue * 10) / 10;
  const valueString = roundedValue % 1 === 0 ? roundedValue.toFixed(0) : roundedValue.toFixed(1);

  return `₹${num < 0 ? '-' : ''}${valueString}${suffixes[divisorIndex]}`;
};

function SwapFund(props) {
  const [allocations, setAllocations] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);
  const [years, setYears] = useState(5);
  const [currentValue, setCurrentValue] = useState(0); // Initialize to 0
  const [projectedValue, setProjectedValue] = useState(null);

  // Fetch existing investments from Supabase
  useEffect(() => {
    const fetchInvestments = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('existing_investments')
        .eq('email', globalVar)
        .single();

      if (error) {
        console.error('Error fetching investments:', error);
      } else {
        const fetchedAllocations = data.existing_investments || {};
        const { calculatedAllocations, totalValue } = calculatePercentages(fetchedAllocations);
        setAllocations(calculatedAllocations);
        setCurrentValue(totalValue); // Set current value to the total of all investments
      }
    };

    fetchInvestments();
  }, []);

  // Function to calculate percentages and total value
  const calculatePercentages = (investments) => {
    let totalInvestment = 0;

    // Calculate total investment across all categories
    Object.values(investments).forEach((category) => {
      category.forEach((investment) => {
        totalInvestment += investment.invested_amount || investment.property_value || 0;
      });
    });

    const updatedAllocations = {};
    Object.entries(investments).forEach(([category, items]) => {
      updatedAllocations[category] = items.map((investment) => {
        const value = investment.invested_amount || investment.property_value || 0;
        const percentage = totalInvestment > 0 ? (value / totalInvestment) * 100 : 0;
        return {
          ...investment,
          percentage: parseFloat(percentage.toFixed(2)), // Round to 2 decimal places
        };
      });
    });

    console.log('Updated Allocations:', updatedAllocations); // Debugging log
    return {
      calculatedAllocations: updatedAllocations,
      totalValue: totalInvestment,
    };
  };

  const handleSliderChange = (assetClass, index, newValue) => {
    const updatedAllocations = { ...allocations };
    const categoryAllocations = [...updatedAllocations[assetClass]];

    // Get previous total percentage for the category
    const prevTotal = categoryAllocations.reduce((sum, item) => sum + item.percentage, 0);

    // Calculate adjustment ratio
    const adjustmentRatio = (prevTotal - categoryAllocations[index].percentage + newValue) / prevTotal;

    // Update all percentages in the category
    categoryAllocations.forEach((item, i) => {
      if (i === index) {
        item.percentage = newValue;
      } else {
        item.percentage = Math.round(item.percentage * adjustmentRatio * 10) / 10;
      }
    });

    updatedAllocations[assetClass] = categoryAllocations;
    setAllocations(updatedAllocations);
  };

  const calculateProjection = () => {
    if (!currentValue || currentValue <= 0) {
      console.error("Invalid current value");
      return;
    }

    // Calculate weighted average return
    let weightedReturn = 0;
    Object.values(allocations).forEach(category => {
      category.forEach(investment => {
        weightedReturn += (investment.percentage / 100) * investment.return;
      });
    });

    // Calculate future value using compound interest formula
    const projection = currentValue * Math.pow(1 + (weightedReturn / 100), years);
    setProjectedValue(projection);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderAssetSection = (assetClass, title) => (
    <Paper className={styles.sectionPaper}>
      <div className={styles.sectionHeader} onClick={() => toggleSection(assetClass)}>
        <Typography variant="h6">{title}</Typography>
        <IconButton>
          {expandedSection === assetClass ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </div>

      <Collapse in={expandedSection === assetClass}>
        <Grid container spacing={2} className={styles.sliderContainer}>
          {allocations[assetClass]?.map((investment, index) => (
            <Grid item xs={12} key={`${assetClass}-${index}`}>
              <div className={styles.sliderWrapper}>
                <div className={styles.investmentHeader}>
                  <Typography variant="subtitle1">{investment.type}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {investment.description}
                  </Typography>
                </div>
                <Slider
                  value={investment.percentage || 0} // Bind to investment.percentage
                  onChange={(e, newVal) => handleSliderChange(assetClass, index, newVal)}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={100}
                  className={styles.riskSlider}
                />
                <div className={styles.sliderLabels}>
                  <Typography variant="caption">
                    {formatIndianNumber(investment.invested_amount || investment.property_value)}
                  </Typography>
                  <Typography variant="caption">
                    {investment.percentage?.toFixed(1)}%
                  </Typography>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </Paper>
  );

  return (
    <section className={styles.container}>
      <Sidebar />
      <div className={styles.contentBlock}>
        <Header />
        <div className={styles.content}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Swap Funds / What-If Analysis
              </Typography>
            </Grid>

            {Object.entries(allocations).map(([assetClass]) => (
              <Grid item xs={12} key={assetClass}>
                {renderAssetSection(
                  assetClass,
                  assetClass.replace(/([A-Z])/g, ' $1').trim()
                )}
              </Grid>
            ))}

            <Grid item xs={12}>
              <Paper className={styles.controlsPaper}>
                <div className={styles.controlsWrapper}>
                  <div className={styles.inputGroup}>
                    <Typography variant="body1">Current Fund Value:</Typography>
                    <Typography variant="h6">
                      {formatIndianNumber(currentValue)}
                    </Typography>
                  </div>

                  <div className={styles.inputGroup}>
                    <Typography variant="body1">Projection Years:</Typography>
                    <select
                      value={years}
                      onChange={(e) => setYears(parseInt(e.target.value, 10))}
                      className={styles.yearSelect}
                    >
                      <option value={5}>5 Years</option>
                      <option value={10}>10 Years</option>
                      <option value={20}>20 Years</option>
                    </select>
                  </div>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={calculateProjection}
                    className={styles.runButton}
                  >
                    Run Simulation
                  </Button>
                </div>
              </Paper>
            </Grid>

            {projectedValue && (
              <Grid item xs={12}>
                <Paper className={styles.resultPaper}>
                  <Typography variant="h6" gutterBottom>
                    Projection Results
                  </Typography>
                  <div className={styles.resultsWrapper}>
                    <div className={styles.resultItem}>
                      <Typography>Current Value:</Typography>
                      <Typography variant="h5">
                        {formatIndianNumber(currentValue)}
                      </Typography>
                    </div>
                    <div className={styles.resultItem}>
                      <Typography>Projected Value ({years} years):</Typography>
                      <Typography variant="h5" color="primary">
                        {formatIndianNumber(projectedValue)}
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    </section>
  );
}

SwapFund.propTypes = {
  className: PropTypes.string,
};

export default SwapFund;