import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';

import { supabase } from 'supabaseClient';
import { globalVar } from 'db';
import { Link } from 'react-router-dom';
import { TextField, Slider } from '@mui/material';



function Dashboard(props) {
  const [valueFilled, setValueFilled] = useState(false);
  const [formData, setFormData] = useState({});
  const [projections, setProjections] = useState({
    currentNetWorth: 0,
    after5Years: 0,
    after10Years: 0,
    after20Years: 0
  });

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

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('setValue, existing_investments').eq('email', globalVar).single();
      if (error) {
        console.error(error);
      } else {
        setValueFilled(data.setValue);
        setFormData(data.existing_investments);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };



  return (
    <section className={cn(styles.containerSection, props.className, 'forms')}>
      <div className={styles.contentBlock}>
        <Sidebar />
        <section className={styles.mainContentSection}>
          <Header />
          {valueFilled ? (
            <div className={styles.portfolioContent}>
              {/* <article className={styles.portfolioTitle}>My Portfolio Projections</article>
              <div className={styles.profileGrid}>
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
                          name={subtype.toLowerCase().split(/[\s-]+/).map((word, index) => (index === 0 ? word : word[0])).join("")}
                          value={formData[subtype.toLowerCase().split(/[\s-]+/).map((word, index) => (index === 0 ? word : word[0])).join("")]}
                          onChange={handleChange}
                        />
                        <Slider
                          value={formData[subtype.toLowerCase().split(/[\s-]+/).map((word, index) => (index === 0 ? word : word[0])).join("")]}
                          onChange={(e, value) => handleSliderChange(subtype.toLowerCase().split(/[\s-]+/).map((word, index) => (index === 0 ? word : word[0])).join(""), value)}
                          aria-labelledby="input-slider"
                          min={0}
                          max={1000000}
                          step={1000}
                        />
                      </div>
                    ))}
                  </div>
                ))}
                
                <div className={styles.projections}>
                  <p>Current Net Worth: ₹{projections.currentNetWorth}</p>
                  <p>After 5 Years: ₹{projections.after5Years}</p>
                  <p>After 10 Years: ₹{projections.after10Years}</p>
                  <p>After 20 Years: ₹{projections.after20Years}</p>
                </div>
              </div> */}
              Not decided what to put
            </div>
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
  className: PropTypes.string
};

export default Dashboard;