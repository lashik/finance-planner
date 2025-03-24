import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import IconButton from '@mui/material/IconButton';

import { Delete, Add } from '@mui/icons-material';
import { Option, Select } from '@mui/joy';
import { Button } from '@mui/material';
import { supabase } from 'supabaseClient';
import { globalVar } from 'db';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import InputField from 'components/InputFields';

const investmentTypes = [
  {
    category: "Equity",
    subtypes: [
      { name: "Direct Stocks", inputs: ["expected_return", "invested_amount"] },
      { name: "Equity Mutual Funds", inputs: ["expected_return", "invested_amount"] },
      { name: "Exchange-Traded Funds (ETFs)", inputs: ["expected_return", "invested_amount"] },
      { name: "Small-Cap, Mid-Cap, Large-Cap Stocks", inputs: ["expected_return", "invested_amount"] }
    ]
  },
  {
    category: "Fixed-Income",
    subtypes: [
      { name: "Government Bonds", inputs: ["interest_rate", "invested_amount", "maturity_period"] },
      { name: "Corporate Bonds", inputs: ["interest_rate", "invested_amount", "maturity_period"] },
      { name: "Fixed Deposits (FDs)", inputs: ["interest_rate", "invested_amount", "maturity_period"] },
      { name: "Debt Mutual Funds", inputs: ["expected_return", "invested_amount"] }
    ]
  },
  {
    category: "Real Estate",
    subtypes: [
      { name: "Residential Property", inputs: ["rental_yield", "property_value"] },
      { name: "Commercial Property", inputs: ["rental_yield", "property_value"] },
      { name: "Real Estate Investment Trusts (REITs)", inputs: ["expected_return", "invested_amount"] }
    ]
  },
  {
    category: "Commodities",
    subtypes: [
      { name: "Gold & Silver", inputs: ["expected_return", "invested_amount"] },
      { name: "Oil & Natural Gas", inputs: ["expected_return", "invested_amount"] },
      { name: "Agricultural Commodities", inputs: ["expected_return", "invested_amount"] }
    ]
  },
  {
    category: "Alternative Investments",
    subtypes: [
      { name: "Private Equity", inputs: ["expected_return", "invested_amount"] },
      { name: "Venture Capital", inputs: ["expected_return", "invested_amount"] },
      { name: "Hedge Funds", inputs: ["expected_return", "invested_amount"] }
    ]
  },
  {
    category: "Cryptocurrencies & Digital Assets",
    subtypes: [
      { name: "Bitcoin", inputs: ["expected_return", "invested_amount"] },
      { name: "Ethereum", inputs: ["expected_return", "invested_amount"] },
      { name: "Altcoins", inputs: ["expected_return", "invested_amount"] },
      { name: "Non-Fungible Tokens (NFTs)", inputs: ["expected_return", "invested_amount"] }
    ]
  },
  {
    category: "Derivatives & Structured Products",
    subtypes: [
      { name: "Options", inputs: ["expected_return", "invested_amount"] },
      { name: "Futures", inputs: ["expected_return", "invested_amount"] },
      { name: "Swaps", inputs: ["expected_return", "invested_amount"] }
    ]
  },
  {
    category: "Cash & Cash Equivalents",
    subtypes: [
      { name: "Savings Accounts", inputs: ["interest_rate", "invested_amount"] },
      { name: "Money Market Funds", inputs: ["expected_return", "invested_amount"] },
      { name: "Treasury Bills (T-Bills)", inputs: ["interest_rate", "invested_amount", "maturity_period"] }
    ]
  }
];

function Portfolio(props) {
  const navigate = useNavigate();
  const [investmentEntries, setInvestmentEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsedCategories, setCollapsedCategories] = useState({}); // State to track collapsed categories

  useEffect(() => {
    const fetchInvestments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("existing_investments")
        .eq("email", globalVar)
        .single();

      if (error) {
        console.error("Error fetching investments:", error.message);
        setLoading(false);
        return;
      }

      if (data && data.existing_investments) {
        const parsedEntries = [];
        Object.entries(data.existing_investments).forEach(([category, investments]) => {
          investments.forEach((investment) => {
            const inputFields = {};
            Object.entries(investment).forEach(([key, val]) => {
              if (key !== "type" && key !== "description") {
                inputFields[key] = val !== null ? String(val) : "";
              }
            });

            parsedEntries.push({
              id: uuidv4(),
              category,
              subtype: investment.type?.trim() || "",
              description: investment.description?.trim() || "",
              inputs: inputFields
            });
          });
        });

        setInvestmentEntries(parsedEntries);
      } else {
        setInvestmentEntries([]);
      }
      setLoading(false);
    };

    fetchInvestments();
  }, []);

  const handleCollapse = (category) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category], // Toggle the collapse state for the category
    }));
  };

  const handleInputChange = (id, input, value) => {
    setInvestmentEntries((prevEntries) => {
      const newEntries = prevEntries.map((entry) =>
        entry.id === id
          ? { ...entry, inputs: { ...entry.inputs, [input]: value || "" } }
          : entry
      );
      return newEntries;
    });
  };

  const handleEntryChange = (id, field, value) => {
    setInvestmentEntries((prevEntries) => {
      const newEntries = prevEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      );
      return newEntries;
    });
  };

  const handleAddEntry = (category) => {
    setInvestmentEntries((prevEntries) => [
      ...prevEntries,
      { id: uuidv4(), category, subtype: "", description: "", inputs: {} }
    ]);
  };

  const handleRemoveEntry = (id) => {
    setInvestmentEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  };

  const handleSubmit = async () => {
    const updatedInvestments = {};

    investmentEntries.forEach((entry) => {
      const { category, subtype, description, inputs } = entry;
      if (!updatedInvestments[category]) {
        updatedInvestments[category] = [];
      }
      updatedInvestments[category].push({
        type: subtype,
        ...inputs,
        description
      });
    });

    const { error } = await supabase
      .from("users")
      .update({ existing_investments: updatedInvestments })
      .eq("email", globalVar);

    if (error) {
      alert("Error updating investments.");
      console.error("Update error:", error.message);
    } else {
      alert("Investments updated successfully!");
      navigate("/Dashboard");
    }
  };

  return (
    <div className={cn(styles.mainContainer, props.className, "creatio-form")}>
      <div className={styles.row}>
        <Sidebar />
        <div className={styles.portfolioSection}>
          <Header />
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignContent: 'center' }}>
            <div className={styles.portfolioTitle}>My Portfolio</div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={styles.submit}
            >
              Submit
            </Button>
          </div>
          {loading ? (
            <div>Loading investments...</div>
          ) : (
            <div className={styles.profileGrid}>
              {/* Create 3 columns */}
              <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '100%' }}>
                {[0, 1, 2].map((colIndex) => (
                  <div key={colIndex} style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '20px' }}>
                    {investmentTypes
                      .filter((_, index) => index % 3 === colIndex) // Distribute items into columns
                      .map(({ category, subtypes }) => (
                        <div key={category} className={styles.block5}>
                          <div className={styles.row6}>
                            <div className={styles.info6}>{category}</div>
                            <IconButton onClick={() => handleAddEntry(category)} className={styles.addButton}>
                              <Add />
                            </IconButton>
                          </div>
                          {investmentEntries
                            .filter((entry) => entry.category === category)
                            .map((entry) => {
                              const selectedSubtype = subtypes.find((sub) => sub.name === entry.subtype) || {
                                inputs: [],
                              };
                              return (
                                <div key={entry.id} className={styles.row8}>
                                  <div className={styles.row1}>
                                    <Select
                                      value={entry.subtype}
                                      onChange={(e) => handleEntryChange(entry.id, 'subtype', e.target.value)}
                                      displayEmpty
                                      sx={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        fontSize: "12.4px",
                                        width: "100%",
                                        borderRadius: "4px",
                                        border: "px solid #ccc",
                                      }}
                                      inputProps={{ 'data-testid': `subtype-select-${entry.id}` }}
                                    >
                                      <Option sx={{
                                        fontFamily: "Inter",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        fontSize: "12.4px",
                                        lineHeight: "15px",
                                      }} disabled>
                                        Select Subtype
                                      </Option>
                                      {subtypes.map((subtype) => (
                                        <Option key={subtype.name} value={subtype.name}>
                                          {subtype.name}
                                        </Option>
                                      ))}
                                    </Select>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleRemoveEntry(entry.id)}
                                      className={styles.removeButton}
                                    >
                                      <Delete />
                                    </IconButton>
                                  </div>

                                  <div className={styles.inputFieldContainer}>
                                    <label htmlFor="description" className={styles.label1}>Description:</label>
                                    <input
                                      id="description"
                                      type="text"
                                      name="description"
                                      value={entry.description}
                                      onChange={(e) => handleEntryChange(entry.id, 'description', e.target.value)}
                                      className={styles.inputField}
                                    />
                                  </div>
                                  {selectedSubtype.inputs.map((input) => (
                                    <div className={styles.inputFieldContainer} key={input}>
                                      <label htmlFor={input}>{input}:</label>
                                      <input
                                        id="values"
                                        type="text"
                                        name={input}
                                        value={entry.inputs[input] || ''}
                                        onChange={(e) => handleInputChange(entry.id, input, e.target.value)}
                                        className={styles.inputField}
                                      />
                                    </div>
                                  ))}
                                </div>
                              );
                            })}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Portfolio.propTypes = {
  className: PropTypes.string,
};

export default Portfolio;