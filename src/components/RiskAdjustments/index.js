import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';
import { supabase } from 'supabaseClient';
import { globalVar } from 'db';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';

function RiskAdjustments(props) {
  const [riskLevel, setRiskLevel] = useState(50);
  const [portfolio, setPortfolio] = useState([]);
  const [existingInvestments, setExistingInvestments] = useState({});

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
    return parseFloat(item.invested_amount) || parseFloat(item.property_value) || 0;
  };

  const updatePortfolio = (risk) => {
    let updatedPortfolio = [];

    for (const category in existingInvestments) {
      existingInvestments[category].forEach((item) => {
        const oldValue = getInvestmentValue(item);
        let adjustmentFactor = 0;

        const simplifiedCategory = categoryMapping[category] || category;

        // Define adjustment factors for each risk level
        const riskAdjustments = {
          low: {
            "Direct Stocks": 0.1,
            "Equity Mutual Funds": 0.07,
            "Exchange-Traded Funds (ETFs)": 0.05,
            "Small-Cap, Mid-Cap, Large-Cap Stocks": 0.03,
            "Government Bonds": 0.05,
            "Corporate Bonds": 0,
            "Fixed Deposits (FDs)": 0.45,
            "Debt Mutual Funds": 0.05,
            "Residential Property": 0.1,
            "Commercial Property": 0,
            "Real Estate Investment Trusts (REITs)": 0,
            "Gold & Silver": 0.05,
            "Oil & Natural Gas": 0,
            "Agricultural Commodities": 0,
            "Private Equity": 0,
            "Hedge Funds": 0,
            "Collectibles": 0,
            "Bitcoin": 0,
            "Non-Fungible Tokens (NFTs)": 0,
            "Options": 0,
            "Swaps": 0,
            "Savings Accounts": 0.05,
            "Money Market Funds": 0,
            "Treasury Bills (T-Bills)": 0,
          },
          medium: {
            "Direct Stocks": 0.15,
            "Equity Mutual Funds": 0.1,
            "Exchange-Traded Funds (ETFs)": 0.05,
            "Small-Cap, Mid-Cap, Large-Cap Stocks": 0.05,
            "Government Bonds": 0.03,
            "Corporate Bonds": 0,
            "Fixed Deposits (FDs)": 0.3,
            "Debt Mutual Funds": 0.07,
            "Residential Property": 0.1,
            "Commercial Property": 0,
            "Real Estate Investment Trusts (REITs)": 0,
            "Gold & Silver": 0.03,
            "Oil & Natural Gas": 0,
            "Agricultural Commodities": 0,
            "Private Equity": 0,
            "Hedge Funds": 0,
            "Collectibles": 0,
            "Bitcoin": 0,
            "Non-Fungible Tokens (NFTs)": 0,
            "Options": 0.05,
            "Swaps": 0.05,
            "Savings Accounts": 0.02,
            "Money Market Funds": 0,
            "Treasury Bills (T-Bills)": 0,
          },
          high: {
            "Direct Stocks": 0.15,
            "Equity Mutual Funds": 0.25,
            "Exchange-Traded Funds (ETFs)": 0.05,
            "Small-Cap, Mid-Cap, Large-Cap Stocks": 0.05,
            "Government Bonds": 0.03,
            "Corporate Bonds": 0,
            "Fixed Deposits (FDs)": 0.05,
            "Debt Mutual Funds": 0.07,
            "Residential Property": 0.1,
            "Commercial Property": 0,
            "Real Estate Investment Trusts (REITs)": 0,
            "Gold & Silver": 0.05,
            "Oil & Natural Gas": 0,
            "Agricultural Commodities": 0,
            "Private Equity": 0.05,
            "Hedge Funds": 0,
            "Collectibles": 0,
            "Bitcoin": 0.03,
            "Non-Fungible Tokens (NFTs)": 0,
            "Options": 0.05,
            "Swaps": 0.05,
            "Savings Accounts": 0.02,
            "Money Market Funds": 0,
            "Treasury Bills (T-Bills)": 0,
          },
        };

        // Determine the risk level
        let riskLevel = "low";
        if (risk >= 33 && risk < 66) {
          riskLevel = "medium";
        } else if (risk >= 66) {
          riskLevel = "high";
        }

        // Get the adjustment factor for the specific subtype
        adjustmentFactor = riskAdjustments[riskLevel][item.type] || 0;

        // Calculate the new value
        const newValue = (oldValue * adjustmentFactor).toFixed(2);

        updatedPortfolio.push({
          name: item.type || "Unnamed Investment",
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
      } else if (data && data.existing_investments) {
        setExistingInvestments(data.existing_investments);
        updatePortfolio(riskLevel);
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