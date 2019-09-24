import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import List from './pages/List';

import openLoanAccountComponent from './pages/openLoanAccount/OpenLoanAccountComponent';
import openLoanAccountSummary from './pages/openLoanAccount/OpenLoanAccountSummary';

import inquiryLoanAccountComponent from './pages/inqLoanAccount/InquiryLoanAccountComponent';
import inquiryLoanAccountSummary from './pages/inqLoanAccount/InquiryLoanAccountSummery';

import calculateInstallmentComponent from './pages/calculateInstallment/CalculateInstallmentComponent';
import calculateInstallmentSummary from './pages/calculateInstallment/CalculateInstallmentSummary';

import disbursementComponent from './pages/disbursement/DisbursementComponent';
import disbursementSummery from './pages/disbursement/DisbursementSummery';

import inquiryPositionPRESTComponent from './pages/inqPositionDetailPREST/InquiryPositionPRESTComponent';
import inquiryPositionPRESTSummery from './pages/inqPositionDetailPREST/InquiryPositionPRESTSummery';

import inquiryInterestComponent from './pages/inqInterestAccrued/InquiryInterestComponent';
import inquiryInterestSummery from './pages/inqInterestAccrued/InquiryInterestSummery';

import inquiryInterestDetailComponent from './pages/inqInterestAccruedDetail/InquiryInterestDetailComponent';
import inquiryInterestDetailSummery from './pages/inqInterestAccruedDetail/InquiryInterestDetailSummery';

import inquiryPositionListComponent from './pages/inqPositionList/InquiryPositionListComponent';
import inquiryPositionListSummery from './pages/inqPositionList/InquiryPositionListSummery';

import RepaymentComponent from './pages/repayment/RepaymentComponent';
import RepaymentSummery from './pages/repayment/RepaymentSummery';

import inquiryPositionDetailComponent from './pages/inqPositionDetail/InquiryPositionDetailComponent';
import inquiryPositionDetailSummery from './pages/inqPositionDetail/InquiryPositionDetailSummery';

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

            <Route path='/ipdprestComponent' component={inquiryPositionPRESTComponent}/>
            <Route path='/ipdprestSummary' component={inquiryPositionPRESTSummery}/>

            <Route path='/iiaComponent' component={inquiryInterestComponent}/>
            <Route path='/iiaSummary' component={inquiryInterestSummery}/>

            <Route path='/iiadComponent' component={inquiryInterestDetailComponent}/>
            <Route path='/iiadSummary' component={inquiryInterestDetailSummery}/>

            <Route path='/iplComponent' component={inquiryPositionListComponent}/>
            <Route path='/iplSummary' component={inquiryPositionListSummery}/>

            <Route path='/rpmComponent' component={RepaymentComponent}/>
            <Route path='/rpmSummary' component={RepaymentSummery}/>

            <Route path='/ipdComponent' component={inquiryPositionDetailComponent}/>
            <Route path='/ipdSummary' component={inquiryPositionDetailSummery}/>

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
