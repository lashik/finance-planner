import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';
import { supabase } from 'supabaseClient';
import { globalVar } from 'db';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';

function GoalSetting(props) {
  const [years, setYears] = useState('');
  const [corpusTarget, setCorpusTarget] = useState('');
  const [selection, setSelection] = useState('currentFinancials');
  const [proposedInvestments, setProposedInvestments] = useState('');

  const handleYearsChange = (e) => setYears(e.target.value);
  const handleCorpusTargetChange = (e) => setCorpusTarget(e.target.value);
  const handleSelectionChange = (e) => setSelection(e.target.value);

  const calculateProposedInvestments = () => {
    // Logic to calculate proposed investments based on years, corpusTarget, and selection
    // For simplicity, let's assume a basic calculation
    const proposed = (parseFloat(corpusTarget) / parseFloat(years)).toFixed(2);
    setProposedInvestments(proposed);
  };

  const handleSubmit = async () => {
    calculateProposedInvestments();

    const { error } = await supabase.from('goals').insert([
      {
        email: globalVar,
        years,
        corpusTarget,
        selection,
        proposedInvestments,
      },
    ]);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Goal setting saved successfully!');
    }
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
            <label htmlFor="selection">Dropdown Selection:</label>
            <select
              id="selection"
              name="selection"
              value={selection}
              onChange={handleSelectionChange}
              className={styles.selectField}
            >
              <option value="currentFinancials">Based on current financials</option>
              <option value="standardCalculations">Standard Calculations</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Proposed Investments:</label>
            <div className={styles.proposedInvestments}>{proposedInvestments}</div>
          </div>
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