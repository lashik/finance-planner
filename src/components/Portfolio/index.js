import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { RadioGroup, Radio } from "@heroui/react";
import styles from './index.module.scss';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import {  TextField } from '@mui/material';
import { useState } from 'react';
const assetClasses = {
  "Equity (Stocks)": ["Direct Stocks", "Equity Mutual Funds", "ETFs", "Small-Cap Stocks", "Mid-Cap Stocks", "Large-Cap Stocks"],
  "Fixed-Income (Bonds & Debt Instruments)": ["Government Bonds", "Corporate Bonds", "Fixed Deposits", "Debt Mutual Funds"],
  "Real Estate": ["Residential Property", "Commercial Property", "REITs"],
  "Commodities": ["Gold & Silver", "Oil & Natural Gas", "Agricultural Commodities"],
  "Cryptocurrencies": ["Bitcoin", "Ethereum", "Altcoins", "NFTs"],
  "Alternative Investments": ["Private Equity", "Hedge Funds", "Collectibles"],
  "Cash & Cash Equivalents": ["Savings Accounts", "Money Market Funds", "T-Bills"],
  "Derivatives & Structured Products": ["Options & Futures", "Swaps & Other Derivatives"]
};

function Portfolio(props) {
  const [values, setValues] = useState({});
  const handleChange = (category, subtype, value) => {
    setValues(prev => ({ ...prev, [category]: { ...prev[category], [subtype]: value } }));
  };
  return (
    <div className={cn(styles.mainContainer, props.className, 'creatio-form')}>
      <div className={styles.row}>
        <Sidebar />

        <div className={styles.portfolioSection}>
          {/* Portfolio Section: Displays user's portfolios and search functionality */}

          <Header />

          <p className={styles.portfolioTitle}>My Portfolio</p>
          
          <div className={styles.profileGrid}>
            {/* Grid of user profiles with personal details */}

            
              

              {Object.entries(assetClasses).map(([category, subtypes]) => (
                <div key={category} className={styles.block5}>
                  <div className={styles.row6}>
                    <div className={styles.info6}>{category}</div>
                  </div>
                  {subtypes.map(subtype => (
                    <div key={subtype} className={styles.row8}>
                      <div className={styles.info71}>{subtype}</div>
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        sx={{ font: "600 14px 'Inter', normal" }}
            
                        onChange={(e) => handleChange(category, subtype, e.target.value)}
                      />
                      <RadioGroup orientation="horizontal">
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                      </RadioGroup>
                      
                    </div>
                  ))}
                </div>
              ))}
            


          </div>
        </div>
      </div>
    </div>
  );
}

Portfolio.propTypes = {
  className: PropTypes.string
};

export default Portfolio;
