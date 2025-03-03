import React, { useEffect } from 'react';

import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from 'aos';
import { isMobile } from 'react-device-detect';
import Register from './components/Register';
import 'aos/dist/aos.css';
import './fonts.css';
import PersonalDetails from './components/PersonalDetails';
import Portfolio from 'components/Portfolio';
import Fpassword from 'components/Fpassword';

import GoalSetting from 'components/GoalSetting';
import RiskAdjustments from 'components/RiskAdjustments';
import PortfolioMy from 'components/PortfolioMy';

function App() {
  useEffect(() => {
    setTimeout(() => {
      AOS.init({
        offset: isMobile ? 10 : 100,
      });
      AOS.refresh();
    }, 1500);
  }, []);
  const policyData = {
    'Agent Code': '3451',
    'Policy Effective Date': 'Select Date',
    'Is this named operator policy?': 'Select',
  };
  return (
    <>
    
      <Router basename={process.env.BASE_PATH}>
        <Routes>
          <Route path="/Form" element={<PersonalDetails/>} />
          <Route exact path="/" element={<Register/>}/>
          <Route exact path="/Dashboard" element={<Dashboard/>} />
          <Route path="/Portfolio" element={<Portfolio/>} />
          <Route path="/Fpassword" element={<Fpassword/>} />
          <Route path="/Goal" element={<GoalSetting/>} />
          <Route path="/Risk" element={<RiskAdjustments/>} />
          <Route path="/Projections" element={<PortfolioMy/>} />
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
