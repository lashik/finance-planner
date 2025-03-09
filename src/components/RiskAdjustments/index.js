import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';
import { supabase } from 'supabaseClient';
import { globalVar } from 'db';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';

function RiskAdjustments(props) {
  const [riskLevel, setRiskLevel] = useState(50); // Default to medium risk
  const [portfolio, setPortfolio] = useState([]);
  const [existingInvestments, setExistingInvestments] = useState({});

  // Map full category names to simplified ones for risk adjustments
  const categoryMapping = {
    "Equity (Stocks)": "Equity",
    "Fixed-Income (Bonds & Debt Instruments)": "Fixed-Income",
    "Real Estate": "Real Estate",
    "Commodities": "Commodities",
    "Alternative Investments": "Alternative Investments",
    "Cryptocurrencies & Digital Assets": "Cryptocurrencies & Digital Assets",
    "Derivatives & Structured Products": "Derivatives",
    "Cash & Cash Equivalents": "Cash & Cash Equivalents"
  };

  const handleRiskChange = (e) => {
    const newRiskLevel = parseFloat(e.target.value);
    setRiskLevel(newRiskLevel);
    updatePortfolio(newRiskLevel);
  };

  const getInvestmentValue = (item) => {
    // Use invested_amount or property_value based on availability
    return parseFloat(item.invested_amount) || parseFloat(item.property_value) || 0;
  };

  const updatePortfolio = (risk) => {
    let updatedPortfolio = [];

    for (const category in existingInvestments) {
      existingInvestments[category].forEach((item) => {
        const oldValue = getInvestmentValue(item);
        let adjustmentFactor = 0;

        const simplifiedCategory = categoryMapping[category] || category;

        if (risk < 33) {
          // Low risk
          if (simplifiedCategory === 'Commodities' || simplifiedCategory === 'Real Estate' || simplifiedCategory === 'Fixed-Income') {
            adjustmentFactor = 0.7;
          } else if (simplifiedCategory === 'Equity') {
            adjustmentFactor = 0.2;
          } else if (simplifiedCategory === 'Cryptocurrencies & Digital Assets') {
            adjustmentFactor = 0.05;
          } else if (simplifiedCategory === 'Cash & Cash Equivalents') {
            adjustmentFactor = 0.025;
          }
        } else if (risk < 66) {
          // Medium risk
          adjustmentFactor = 0.3; // Simplified medium risk adjustment
        } else {
          // High risk
          if (simplifiedCategory === 'Commodities' || simplifiedCategory === 'Real Estate' || simplifiedCategory === 'Fixed-Income') {
            adjustmentFactor = 0.1;
          } else if (simplifiedCategory === 'Equity') {
            adjustmentFactor = 0.4;
          } else if (simplifiedCategory === 'Cryptocurrencies & Digital Assets') {
            adjustmentFactor = 0.3;
          } else if (simplifiedCategory === 'Cash & Cash Equivalents') {
            adjustmentFactor = 0.025;
          }
        }

        const newValue = (oldValue * adjustmentFactor).toFixed(2);

        updatedPortfolio.push({
          name: item.type || 'Unnamed Investment', // Fallback if type is missing
          oldValue: oldValue.toFixed(2),
          newValue: newValue
        });
      });
    }

    setPortfolio(updatedPortfolio);
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('existing_investments')
        .eq('email', globalVar)
        .single();

      if (error) {
        console.error('Error fetching portfolio:', error.message);
      } else if (data && data.existing_investments) {
        setExistingInvestments(data.existing_investments);
        updatePortfolio(riskLevel); // Initialize portfolio with default risk level
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <section className={cn(styles.containerSection, props.className, 'risk-adjustments')}>
      <Sidebar />
      <div className={styles.contentBlock}>
        <Header />
        <div className={styles.content}>
          <div className={styles.title}>Risk Adjustments</div>
          <div className={styles.sliderContainer}>
            <label htmlFor="riskSlider">Risk Level:</label>
            <input
              type="range"
              id="riskSlider"
              name="riskSlider"
              min="0"
              max="100"
              value={riskLevel}
              onChange={handleRiskChange}
              className={styles.slider}
            />
            <div className={styles.riskLabels}>
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
          <div className={styles.portfolioContainer}>
            <div className={styles.portfolioTitle}>Portfolio</div>
            <ul className={styles.portfolioList}>
              {portfolio.map((item, index) => (
                <li key={index} className={styles.portfolioItem}>
                  <span className={styles.portfolioName}>
                    {item.name} ({((parseFloat(item.newValue) / parseFloat(item.oldValue)) * 100).toFixed(2)}%)
                  </span>
                  <span className={styles.portfolioValue}>Old: ₹{item.oldValue.toLocaleString('en-IN')}</span>
                  <span className={styles.portfolioValue}>New: ₹{item.newValue.toLocaleString('en-IN')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

RiskAdjustments.propTypes = {
  className: PropTypes.string,
};

export default RiskAdjustments;