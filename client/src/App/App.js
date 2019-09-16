import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import List from './pages/List';

import openLoanAccountComponent from './pages/openLoanAccount/OpenLoanAccountComponent';
import openLoanAccountSummary from './pages/openLoanAccount/OpenLoanAccountSummary';

import inquiryLoanAccountComponent from './pages/inqLoanAccount/InquiryLoanAccountComponent';
import inquiryLoanAccountSummary from './pages/inqLoanAccount/InquiryLoanAccountSummery';

import calculateInstallmentComponent from './pages/calculateInstallment/calculateInstallmentComponent';
import calculateInstallmentSummary from './pages/calculateInstallment/calculateInstallmentSummary';

import disbursementComponent from './pages/disbursement/disbursementComponent';
import disbursementSummery from './pages/disbursement/disbursementSummery';

import inquiryPositionComponent from './pages/inqPositionDetailPREST/InquiryPositionComponent';
import inquiryPositionSummery from './pages/inqPositionDetailPREST/InquiryPositionSummery';

import inquiryInterestComponent from './pages/inqInterestAccrued/InquiryInterestComponent';
import inquiryInterestSummery from './pages/inqInterestAccrued/InquiryInterestSummery';

import inquiryInterestDetailComponent from './pages/inqInterestAccruedDetail/InquiryInterestDetailComponent';
import inquiryInterestDetailSummery from './pages/inqInterestAccruedDetail/InquiryInterestDetailSummery';

import inqPositionComponent from './pages/inqPositionDetail/inqPositionComponent';
import inqPositionSummery from './pages/inqPositionDetail/inqPositionSummery';

import RepaymentComponent from './pages/repayment/RepaymentComponent';
import RepaymentSummery from './pages/repayment/RepaymentSummery';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>

          <Route path='/olaComponent' component={openLoanAccountComponent}/>
          <Route path='/olaSummary' component={openLoanAccountSummary}/>

          <Route path='/ilaComponent' component={inquiryLoanAccountComponent}/>
          <Route path='/ilaSummary' component={inquiryLoanAccountSummary}/>

          <Route path='/ciaComponent' component={calculateInstallmentComponent}/>
          <Route path='/ciaSummary' component={calculateInstallmentSummary}/>

          <Route path='/dbmComponent' component={disbursementComponent}/>
          <Route path='/dbmSummary' component={disbursementSummery}/>

          <Route path='/ipdprestComponent' component={inquiryPositionComponent}/>
          <Route path='/ipdprestSummary' component={inquiryPositionSummery}/>

          <Route path='/iiaComponent' component={inquiryInterestComponent}/>
          <Route path='/iiaSummary' component={inquiryInterestSummery}/>

          <Route path='/iiadComponent' component={inquiryInterestDetailComponent}/>
          <Route path='/iiadSummary' component={inquiryInterestDetailSummery}/>

          <Route path='/ipdComponent' component={inqPositionComponent}/>
          <Route path='/ipdSummary' component={inqPositionSummery}/>

          <Route path='/rpmComponent' component={RepaymentComponent}/>
          <Route path='/rpmSummary' component={RepaymentSummery}/>

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
