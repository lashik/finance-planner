import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.scss';
import { supabase } from 'supabaseClient';
import { globalVar } from 'db';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import { Chart } from 'chart.js/auto'; // Ensure Chart.js is installed (npm install chart.js)

function PortfolioMy(props) {
    const [netWorth, setNetWorth] = useState({ current: 0, predictions: {} });
    const [chartInstance, setChartInstance] = useState(null);
    const [investmentPredictions, setInvestmentPredictions] = useState({});

    const parseDetails = (details) => {
        const match = details.match(/₹([\d,]+)/);
        return match ? parseFloat(match[1].replace(/,/g, '')) : 0;
    };

    const calculateCategoryValue = (categoryArray) => {
        return categoryArray.reduce((sum, item) => sum + parseDetails(item.details), 0);
    };

    const calculateProjections = (data) => {
        const currentIncome = (data.professionalIncome || 0) + (data.otherIncome || 0);
        const totalExpenses =
            (data.insurancePremium || 0) + (data.ongoingSavings || 0) + (data.loan || 0) +
            (data.houseRent || 0) + (data.electricityBills || 0) + (data.telephoneBills || 0) +
            (data.grocery || 0) + (data.medicine || 0) + (data.educationFees || 0) +
            (data.houseHelp || 0) + (data.socialCause || 0) + (data.entertainment || 0);
        const currentInvestmentsValue = Object.values(data.existing_investments || {}).reduce(
            (sum, category) => sum + calculateCategoryValue(category), 0
        );
        const currentNetWorth = currentIncome + currentInvestmentsValue - totalExpenses;

        const growthRates = {
            "Equity": { "5_years": 7.5, "10_years": 7.0, "20_years": 6.5 },
            "Fixed-Income": { "5_years": 4.0, "10_years": 3.8, "20_years": 3.5 },
            "Real Estate": { "5_years": 5.5, "10_years": 5.0, "20_years": 4.5 },
            "Commodities": { "5_years": 6.5, "10_years": 6.0, "20_years": 5.5 },
            "Cryptocurrencies & Digital Assets": { "5_years": 15.0, "10_years": 12.0, "20_years": 10.0 },
            "Cash & Cash Equivalents": { "5_years": 2.5, "10_years": 2.3, "20_years": 2.0 }
        };

        const predictedValues = {};
        for (const category in data.existing_investments || {}) {
            const categoryValue = calculateCategoryValue(data.existing_investments[category]);
            predictedValues[category] = {
                "5_years": categoryValue * (1 + growthRates[category]?.["5_years"] / 100 || 0),
                "10_years": categoryValue * Math.pow(1 + growthRates[category]?.["10_years"] / 100 || 0, 2),
                "20_years": categoryValue * Math.pow(1 + growthRates[category]?.["20_years"] / 100 || 0, 4)
            };
        }

        const netSavings = currentIncome - totalExpenses;
        const periodMultipliers = { "5_years": 5, "10_years": 10, "20_years": 20 };
        const totalPredictedNetWorth = {};
        let totalGrowthFactor = 1;
        for (const category in predictedValues) {
            totalGrowthFactor *= (1 + (growthRates[category]?.["5_years"] || 0) / 100);
        }
        for (const period in periodMultipliers) {
            const years = periodMultipliers[period];
            const growth = Math.pow(totalGrowthFactor, years / 5);
            totalPredictedNetWorth[period] = currentNetWorth * growth + (netSavings * years);
        }

        setInvestmentPredictions(predictedValues);
        return { current: currentNetWorth, predictions: totalPredictedNetWorth };
    };

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('professionalIncome, otherIncome, insurancePremium, ongoingSavings, loan, houseRent, electricityBills, telephoneBills, grocery, medicine, educationFees, houseHelp, socialCause, entertainment, existing_investments')
                .eq('email', globalVar)
                .single();
            if (error) {
                console.error('Error fetching data:', error.message);
            } else if (data) {
                const safeData = { ...data, existing_investments: JSON.parse(JSON.stringify(data.existing_investments)) };
                setNetWorth(calculateProjections(safeData));
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (netWorth.current && chartInstance) {
            chartInstance.destroy();
        }
        const ctx = document.getElementById('netWorthChart').getContext('2d');
        const newChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Current', '5 Years', '10 Years', '20 Years'],
                datasets: [{
                    label: 'Net Worth (₹)',
                    data: [netWorth.current, netWorth.predictions['5_years'], netWorth.predictions['10_years'], netWorth.predictions['20_years']],
                    borderColor: '#007bff',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: value => `₹${value.toLocaleString('en-IN')}` }
                    }
                },
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { callbacks: { label: context => `₹${context.raw.toLocaleString('en-IN')}` } }
                }
            }
        });
        setChartInstance(newChartInstance);

        return () => {
            if (chartInstance) chartInstance.destroy();
        };
    }, [netWorth]);

    return (
        <section className={cn(styles.containerSection, props.className, 'portfolio-projections')}>
            <Sidebar />
            <div className={styles.contentBlock}>
                <Header />
                <div className={styles.content}>
                    <div className={styles.title}>My Portfolio Projections</div>
                    <div className={styles.chartContainer}>
                        <canvas id="netWorthChart"></canvas>
                        <div className={styles.fiveYearLabel}>
                            <span> Total Net Worth Projections </span>
                            <span>After 5 Years: ₹{netWorth.predictions['5_years']?.toLocaleString('en-IN') || 'N/A'}</span>
                            <span>After 10 Years: ₹{netWorth.predictions['10_years']?.toLocaleString('en-IN') || 'N/A'}</span>
                            <span>After 20 Years: ₹{netWorth.predictions['20_years']?.toLocaleString('en-IN') || 'N/A'}</span>

                        </div>
                    </div>
                    <div className={styles.projectionControls}>
                        <label>Current Net Worth: ₹{netWorth.current.toLocaleString('en-IN')}</label>
                        <input
                            type="range"
                            min="0"
                            max="10000000"
                            value={netWorth.current}
                            onChange={(e) => setNetWorth(prev => ({ ...prev, current: parseFloat(e.target.value) }))}
                            className={styles.projectionSlider}
                        />
                        
                    </div>
                    <div className={styles.investmentProjections}>
                        <div className={styles.investmentTitle}>Investment Projections</div>
                        <ul className={styles.portfolioList}>
                            {Object.entries(investmentPredictions).map(([category, predictions]) => (
                                <li key={predictions} className={styles.portfolioItem}>
                                    <span className={styles.portfolioName}>{category}</span>
                                    <span className={styles.portfolioValue}>5 Years: ₹{predictions['5_years'].toLocaleString('en-IN')}</span>
                                    <span className={styles.portfolioValue}>10 Years: ₹{predictions['10_years'].toLocaleString('en-IN')}</span>
                                    <span className={styles.portfolioValue}>20 Years: ₹{predictions['20_years'].toLocaleString('en-IN')}</span>
                                </li>

                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}

PortfolioMy.propTypes = {
    className: PropTypes.string,
};

export default PortfolioMy;