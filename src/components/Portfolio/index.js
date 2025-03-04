import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { Button } from '@mui/material';
import { supabase } from 'supabaseClient';
import { globalVar } from 'db';
import { useNavigate } from 'react-router-dom';

function Portfolio(props) {
  const navigate = useNavigate();
  const assetClasses = {
    "Equity": ["Direct Stocks", "Equity Mutual Funds", "Exchange-Traded Funds (ETFs)", "Small-Cap, Mid-Cap, Large-Cap Stocks"],
    "Fixed-Income": ["Government Bonds", "Corporate Bonds", "Fixed Deposits (FDs)", "Debt Mutual Funds"],
    "Real Estate": ["Residential Property"],
    "Commodities": ["Gold & Silver"],
    "Cryptocurrencies & Digital Assets": ["Cryptocurrencies & Digital Assets"],
    "Alternative Investments": [],
    "Cash & Cash Equivalents": ["Savings Account"],
    "Derivatives & Structured Products": []
  };

  const [formData, setFormData] = useState({});
  const [existingInvestments, setExistingInvestments] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("existing_investments").eq("email", globalVar).single();

      if (error) {
        console.error("Error fetching users:", error.message);
      } else if (data) {
        setExistingInvestments(data.existing_investments);
        const initialFormData = {};
        Object.entries(data.existing_investments).forEach(([category, investments]) => {
          investments.forEach(investment => {
            const key = investment.type.toLowerCase().split(/[\s-]+/).map((word, index) => (index === 0 ? word : word[0])).join("");
            initialFormData[key] = parseFloat(investment.details.replace(/[^0-9.-]+/g, ""));
          });
        });
        setFormData(initialFormData);
      }
    };

    fetchUsers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle slider changes
  const handleSliderChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const updatedInvestments = { ...existingInvestments };

    Object.entries(assetClasses).forEach(([category, subtypes]) => {
      updatedInvestments[category] = subtypes.map(subtype => {
        const key = subtype.toLowerCase().split(/[\s-]+/).map((word, index) => (index === 0 ? word : word[0])).join("");
        return {
          type: subtype,
          details: `₹${formData[key]}`,
          description: existingInvestments[category]?.find(item => item.type === subtype)?.description || ""
        };
      });
    });

    const { error } = await supabase
      .from("users")
      .update({ existing_investments: updatedInvestments })
      .eq("email", globalVar);

    if (error) {
      alert("Error updating user details. Please try again.");
      console.error("Update error:", error.message);
    } else {
      alert("User details updated successfully!");
      
    }
  };

  return (
    <div className={cn(styles.mainContainer, props.className, 'creatio-form')}>
      <div className={styles.row}>
        <Sidebar />

        <div className={styles.portfolioSection}>
          <Header />

          <p className={styles.portfolioTitle}>My Portfolio</p>
          
          <div className={styles.profileGrid}>
            {Object.entries(assetClasses).map(([category, subtypes]) => (
              <div key={category} className={styles.block5}>
                <div className={styles.row6}>
                  <div className={styles.info6}>{category}</div>
                </div>
                {subtypes.map(subtype => {
                  const key = subtype.toLowerCase().split(/[\s-]+/).map((word, index) => (index === 0 ? word : word[0])).join("");
                  return (
                    <div key={subtype} className={styles.row8}>
                      <div className={styles.info71}>{subtype}</div>
                      <input
                        type="number"
                        className={styles.inputName} // Assuming this is the class used in Register input-name
                        name={key}
                        value={formData[key] || ""}
                        onChange={handleChange}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
            <Button variant="contained" color="primary" onClick={handleSubmit} className={styles.submit}>
              Submit
            </Button>
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