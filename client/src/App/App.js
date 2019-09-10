import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import OpenLoanAccountComponent from './pages/openLoanAccount/OpenLoanAccountComponent';
import OpenLoanAccountSummary from './pages/openLoanAccount/OpenLoanAccountSummary';
import InquiryLoanAccountComponent from './pages/inqLoanAccount/InquiryLoanAccountComponent';
import InquiryLoanAccountSummary from './pages/inqLoanAccount/InquiryLoanAccountSummery';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path='/olaComponent' component={OpenLoanAccountComponent}/>
          <Route path='/olaSummary' component={OpenLoanAccountSummary}/>
          <Route path='/ilaComponent' component={InquiryLoanAccountComponent}/>
          <Route path='/ilaSummary' component={InquiryLoanAccountSummary}/>
        </Switch>
      </div>
    );
    return (
      <Switch>
        <App/>
      </Switch>
    
    );
  }
}

export default App;
