import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { supabase } from 'supabaseClient';
import { globalVar } from 'db';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Add UUID for stable keys

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

  // Fetch investments from Supabase
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
        console.log("Fetched investments:", data.existing_investments);
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

  // Handle input change
  const handleInputChange = (id, input, value) => {
    setInvestmentEntries((prevEntries) => {
      const newEntries = prevEntries.map((entry) =>
        entry.id === id
          ? { ...entry, inputs: { ...entry.inputs, [input]: value || "" } }
          : entry
      );
      console.log("Updated entries after input change:", newEntries);
      return newEntries;
    });
  };

  // Handle subtype and description change
  const handleEntryChange = (id, field, value) => {
    setInvestmentEntries((prevEntries) => {
      const newEntries = prevEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      );
      console.log("Updated entries after entry change:", newEntries);
      return newEntries;
    });
  };

  // Add new investment
  const handleAddEntry = (category) => {
    setInvestmentEntries((prevEntries) => [
      ...prevEntries,
      { id: uuidv4(), category, subtype: "", description: "", inputs: {} }
    ]);
  };

  // Remove an investment entry
  const handleRemoveEntry = (id) => {
    setInvestmentEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  };

  // Save investments to Supabase
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
          <div className={styles.portfolioTitle}>My Portfolio</div>

          {loading ? (
            <div>Loading investments...</div>
          ) : (
            <div className={styles.profileGrid}>
              {investmentTypes.map(({ category, subtypes }) => (
                <div key={category} className={styles.block5}>
                  <div className={styles.row6}>
                    <div className={styles.info6}>{category}</div>
                    <Button onClick={() => handleAddEntry(category)} className={styles.addButton}>
                      Add
                    </Button>
                  </div>
                  {investmentEntries
                    .filter((entry) => entry.category === category)
                    .map((entry) => {
                      const selectedSubtype = subtypes.find((sub) => sub.name === entry.subtype) || {
                        inputs: []
                      };
                      return (
                        <div key={entry.id} className={styles.row8}>
                          <Select
                            value={entry.subtype}
                            onChange={(e) => handleEntryChange(entry.id, "subtype", e.target.value)}
                            displayEmpty
                            className={styles.inputName}
                            inputProps={{ "data-testid": `subtype-select-${entry.id}` }}
                          >
                            <MenuItem value="" disabled>
                              Select Subtype
                            </MenuItem>
                            {subtypes.map((subtype) => (
                              <MenuItem key={subtype.name} value={subtype.name}>
                                {subtype.name}
                              </MenuItem>
                            ))}
                          </Select>
                          <TextField
                            type="text"
                            variant="outlined"
                            size="small"
                            className={styles.inputName}
                            placeholder="Description"
                            value={entry.description || ""}
                            onChange={(e) => handleEntryChange(entry.id, "description", e.target.value)}
                            inputProps={{ "data-testid": `description-input-${entry.id}` }}
                          />
                          {selectedSubtype.inputs.map((input) => (
                            <TextField
                              key={input}
                              label={input}
                              type="number"
                              variant="outlined"
                              size="small"
                              className={styles.inputName}
                              placeholder={input}
                              value={entry.inputs[input] !== undefined ? String(entry.inputs[input]) : ""}
                              onChange={(e) =>
                                handleInputChange(entry.id, input, e.target.value)
                              }
                              inputProps={{ "data-testid": `${input}-input-${entry.id}` }}
                            />
                          ))}
                          <Button
                            onClick={() => handleRemoveEntry(entry.id)}
                            className={styles.removeButton}
                          >
                            Remove
                          </Button>
                        </div>
                      );
                    })}
                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={styles.submit}
              >
                Submit
              </Button>
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