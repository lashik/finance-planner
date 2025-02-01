import React, { useEffect } from 'react';

import Forms from './components/Forms';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AOS from 'aos';
import { isMobile } from 'react-device-detect';
import Register from './components/Register';
import 'aos/dist/aos.css';
import './fonts.css';
import CreatioForm from 'components/CreatioForm';
import Portfolio from 'components/Portfolio';


function App() {
  useEffect(() => {
    setTimeout(() => {
      AOS.init({
        offset: isMobile ? 10 : 100,
      });
      AOS.refresh();
    }, 1500);
  }, []);

  return (
    <>
      <Router basename={process.env.BASE_PATH}>
        <Switch>
          <Route path="/Form" component={CreatioForm} />
          <Route exact path="/" component={Register}/>
          <Route exact path="/Forms" component={Forms} />
          <Route path="/Portfolio" component={Portfolio} />
        </Switch>
      </Router>
    </>
    
  );
}

export default App;
