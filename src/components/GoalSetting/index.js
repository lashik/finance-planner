import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';
import { supabase } from 'supabaseClient';
import { globalVar } from 'db';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import { useEffect } from 'react';
function GoalSetting(props) {
  const [years, setYears] = useState('');
  const [corpusTarget, setCorpusTarget] = useState('');
  const [selection, setSelection] = useState('currentFinancials');
  const [currentFundValue, setCurrentFundValue] = useState('');
  const [proposedInvestments, setProposedInvestments] = useState({});
  const [message, setMessage] = useState('');

  const assetClassReturns = {
    equity: 14, // Average return for equity
    fixedIncome: 7, // Average return for fixed-income
    realEstate: 5, // Average return for real estate
    commodities: 4.5, // Average return for commodities
    alternativeInvestments: 15, // Average return for alternative investments
    cryptocurrencies: 13.5, // Average return for cryptocurrencies
    derivatives: 11.5, // Average return for derivatives
    cashEquivalents: 7, // Average return for cash equivalents
  };
  const totalReturn = Object.values(assetClassReturns).reduce((a, b) => a + b, 0);
  const handleYearsChange = (e) => setYears(e.target.value);
  const handleCorpusTargetChange = (e) => setCorpusTarget(e.target.value);
  const handleSelectionChange = (e) => setSelection(e.target.value);
  const handleCurrentFundValueChange = (e) => setCurrentFundValue(e.target.value);
  useEffect(() => {
    const fetchGoalSettings = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('years, corpusTarget, selection, currentFundValue, proposedInvestments')
        .eq('email', globalVar)
        .single();

      if (error) {
        console.error('Error fetching goal settings:', error);
        return;
      }

      if (data) {
        setYears(data.years || '');
        setCorpusTarget(data.corpusTarget || '');
        setSelection(data.selection || 'currentFinancials');
        setCurrentFundValue(data.currentFundValue || '');
        setProposedInvestments(data.proposedInvestments || {});
      }
    };

    fetchGoalSettings();
  }, []);
  const calculateProposedInvestments = () => {
    if (!years || !corpusTarget) {
      setMessage('Please enter both the number of years and corpus target.');
      return;
    }

   
    const proposed = {};

    Object.keys(assetClassReturns).forEach((assetClass) => {
      const percentage = assetClassReturns[assetClass] / totalReturn;
      proposed[assetClass] = (percentage * corpusTarget).toFixed(2);
    });

    setProposedInvestments(proposed);
    setMessage('');
  };

  const handleSubmit = async () => {
    calculateProposedInvestments();

    if (selection === 'currentFinancials') {
      const futureValue = (currentFundValue * Math.pow(1 + totalReturn / 100, years)).toFixed(2);
      if (futureValue >= corpusTarget) {
        setMessage(`It is possible to achieve your target. Future value: ₹${futureValue}`);
      } else {
        setMessage(`It is not possible to achieve your target. Future value: ₹${futureValue}`);
      }
    } else if (selection === 'standardCalculations') {
      const requiredFundValue = (corpusTarget / Math.pow(1 + totalReturn / 100, years)).toFixed(2);
      setMessage(
        `To achieve your target of ₹${corpusTarget} in ${years} years, your current fund value should be ₹${requiredFundValue}.`
      );
    }

    const { error } = await supabase
    .from('users')
    .update(
          {years: years,
          corpusTarget: corpusTarget,
          selection: selection,
          currentFundValue: currentFundValue,
          proposedInvestments: proposedInvestments,}
    )
    .eq('email', globalVar);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Goal setting saved successfully!');
    }
  };
  const formatAssetClassName = (assetClass) => {
    // Add a space before each uppercase letter (except the first letter) and capitalize the first letter
    return assetClass
      .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
      .trim(); // Remove any leading or trailing spaces
  };

  return (
    <section className={cn(styles.containerSection, props.className, 'goal-setting')}>
      <Sidebar />
      <div className={styles.contentBlock}>
        <Header />
        <div className={styles.form}>
          <div className={styles.title}>Goal Setting</div>
          <div className={styles.formGroup}>
            <label htmlFor="years">Number of Years:</label>
            <input
              type="number"
              id="years"
              
              name="years"
              value={years}
              onChange={handleYearsChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="corpusTarget">Corpus Target:</label>
            <input
              type="number"
              id="corpusTarget"
              
              name="corpusTarget"
              value={corpusTarget}
              onChange={handleCorpusTargetChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="currentFundValue">Current Fund Value:</label>
            <input
              type="number"
              id="currentFundValue"
              name="currentFundValue"
              value={currentFundValue}
              onChange={handleCurrentFundValueChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="selection">Dropdown Selection:</label>
            <select
              id="selection"
              name="selection"
              value={selection}
              onChange={handleSelectionChange}
              className={styles.selectField}
            >
              <option value="currentFinancials" className={styles.options}>Based on current financials</option>
              <option value="standardCalculations" className={styles.options}>Standard Calculations</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Proposed Investments:</label>
            <div className={styles.proposedInvestments}>
              {Object.entries(proposedInvestments).map(([assetClass, amount]) => (
                <div key={assetClass}>
                 {formatAssetClassName(assetClass)}: ₹{amount}
                </div>
              ))}
            </div>
          </div>
          {message && <div className={styles.message}>{message}</div>}
          <button className={styles.submitButton} onClick={handleSubmit}>
            Save Goal
          </button>
        </div>
      </div>
    </section>
  );
}

GoalSetting.propTypes = {
  className: PropTypes.string,
};

export default GoalSetting;