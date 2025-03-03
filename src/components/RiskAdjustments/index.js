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

  const handleRiskChange = (e) => {
    setRiskLevel(e.target.value);
    updatePortfolio(e.target.value);
  };

  const parseDetails = (details) => {
    const value = details.match(/₹([\d,]+)/);
    return value ? parseFloat(value[1].replace(/,/g, '')) : 0;
  };

  const updatePortfolio = (risk) => {
    let updatedPortfolio = [];

    for (const category in existingInvestments) {
      existingInvestments[category].forEach((item) => {
        const oldValue = parseDetails(item.details);
        let newValue = 0;

        if (risk < 33) {
          // Low risk
          if (category === 'Commodities' || category === 'Real Estate' || category === 'Fixed-Income') {
            newValue = (oldValue * 0.7).toFixed(2);
          } else if (category === 'Equity') {
            newValue = (oldValue * 0.2).toFixed(2);
          } else if (category === 'Cryptocurrencies & Digital Assets') {
            newValue = (oldValue * 0.05).toFixed(2);
          } else if (category === 'Cash & Cash Equivalents') {
            newValue = (oldValue * 0.025).toFixed(2);
          }
        } else if (risk < 66) {
          // Medium risk
          newValue = (oldValue * 0.3).toFixed(2);
        } else {
          // High risk
          if (category === 'Commodities' || category === 'Real Estate' || category === 'Fixed-Income') {
            newValue = (oldValue * 0.1).toFixed(2);
          } else if (category === 'Equity') {
            newValue = (oldValue * 0.4).toFixed(2);
          } else if (category === 'Cryptocurrencies & Digital Assets') {
            newValue = (oldValue * 0.3).toFixed(2);
          } else if (category === 'Cash & Cash Equivalents') {
            newValue = (oldValue * 0.025).toFixed(2);
          }
        }

        updatedPortfolio.push({
          name: item.type,
          oldValue: oldValue.toFixed(2),
          newValue: newValue,
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
      } else {
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
                  <span className={styles.portfolioName}>{item.name}  ({(parseFloat(item.newValue)/parseFloat(item.oldValue))*100}%)</span>
                  <span className={styles.portfolioValue}>Old: ₹{item.oldValue}</span>
                  <span className={styles.portfolioValue}>New: ₹{parseFloat(item.oldValue) + parseFloat(item.newValue)}</span>
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