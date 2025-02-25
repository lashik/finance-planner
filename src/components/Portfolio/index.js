import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { RadioGroup, Radio } from "@heroui/react";
import styles from './index.module.scss';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import {  TextField } from '@mui/material';
import { useState,useEffect } from 'react';
import { supabase } from 'supabaseClient';
import { globalVar } from 'db';
import { useNavigate } from 'react-router-dom';

function Portfolio(props) {
  const navigate = useNavigate();
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
  const [formData, setFormData] = useState({
    directs: "",
    equitymf: "",
    etfs: "",
    smallcs: "",
    midcs: "",
    largecs: "",
    governmentb: "",
    corporateb: "",
    fixedd: "",
    debtmf: "",
    residentialp: "",
    commercialp: "",
    reits: "",
    golds: "",
    oilng: "",
    agriculturalc: "",
    bitcoin: "",
    ethereum: "",
    altcoins: "",
    nfts: "",
    privatee: "",
    hedgef: "",
    collectibles: "",
    savingsa: "",
    moneymf: "",
    tbills: "",
    optionsf: "",
    swapsod: ""
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*").eq("email", globalVar).single();

      if (error) {
        console.error("Error fetching users:", error.message);
      } else if (data) {
        setFormData(data); // Set formData to last user
      }
    };

    fetchUsers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const {  error } = await supabase
      .from("users")
      .update(formData)
      .eq("email", globalVar);

    if (error) {
      alert("Error updating user details. Please try again.");
      console.error("Update error:", error.message);
    } else {
      alert("User details updated successfully!");
      navigate("/Dashboard");
    }
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

            
              

            {Object.entries(assetClasses).map(([category, subtypes]) =>  (
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
                      
                      {/* <RadioGroup orientation="horizontal">
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                      </RadioGroup> */}
                      
                    </div>
                  ))}
                </div>
              ))}
              <button className={styles.submit} onClick={handleSubmit}>Submit</button>


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
