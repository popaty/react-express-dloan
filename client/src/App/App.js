import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import List from './pages/List';

import OpenAccountComponent from './pages/openLoanAccount/viewOpenAccountComponent';
import OpenAccountSummery from './pages/openLoanAccount/viewOpenAccountSummery';

import inquiryLoanAccountComponent from './pages/inqLoanAccount/viewInquiryLoanAccountComponent';
import inquiryLoanAccountSummary from './pages/inqLoanAccount/viewInquiryLoanAccountSummery';

import calculateInstallmentComponent from './pages/calculateInstallment/viewCalculateInstallmentComponent';
import calculateInstallmentSummary from './pages/calculateInstallment/viewCalculateInstallmentSummary';

import disbursementComponent from './pages/disbursement/viewDisbursementComponent';
import disbursementSummery from './pages/disbursement/viewDisbursementSummery';

import inquiryPositionPRESTComponent from './pages/inqPositionDetailPREST/viewInquiryPositionPRESTComponent';
import inquiryPositionPRESTSummery from './pages/inqPositionDetailPREST/viewInquiryPositionPRESTSummery';

import inquiryInterestComponent from './pages/inqInterestAccrued/viewInquiryInterestComponent';
import inquiryInterestSummery from './pages/inqInterestAccrued/viewInquiryInterestSummery';

import inquiryInterestDetailComponent from './pages/inqInterestAccruedDetail/viewInquiryInterestDetailComponent';
import inquiryInterestDetailSummery from './pages/inqInterestAccruedDetail/viewInquiryInterestDetailSummery';

import inquiryPositionListComponent from './pages/inqPositionList/viewInquiryPositionListComponent';
import inquiryPositionListSummery from './pages/inqPositionList/viewInquiryPositionListSummery';

import RepaymentComponent from './pages/repayment/viewRepaymentComponent';
import RepaymentSummery from './pages/repayment/viewRepaymentSummery';

import inquiryPositionDetailComponent from './pages/inqPositionDetail/viewInquiryPositionDetailComponent';
import inquiryPositionDetailSummery from './pages/inqPositionDetail/viewInquiryPositionDetailSummery';

import inquiryAccountingRecordsComponent from './pages/inqAccountingRecords/viewInquiryAccountingRecordsComponent';

import inquiryPrincipalReconciliationComponent from './pages/Reconciliation/InquiryPrincipalReconciliationResult/viewInquiryPrincipalReconciliationComponent';

import inquiryInterestReconciliationComponent from './pages/Reconciliation/InquiryInterestReconciliationResult/viewInquiryInterestReconciliationComponent';

import inquiryPenaltyReconciliationComponent from './pages/Reconciliation/InquiryPenaltyReconciliationResult/viewInquiryPenaltyReconciliationComponent';

import inquiryGLReconciliationComponent from './pages/Reconciliation/InquiryGLReconciliation/viewInquiryGLReconciliationComponent';

import calculateInstallmentAmountOfSpecificComponent from './pages/calculateInstallmentOfSpecific/viewCalculateInstallmentAmountOfSpecificComponent';
import calculateInstallmentAmountOfSpecificSummery from './pages/calculateInstallmentOfSpecific/viewCalculateInstallmentAmountOfSpecificSummary';

import preDisbursementComponent from './pages/pre-disbursement/viewPreDisbursementComponent'
import preDisbursementSummary from './pages/pre-disbursement/viewPreDisbursementSummary'

import PreRepaymentComponent from './pages/pre-repayment/viewPre-RepaymentComponent';
import PreRepaymentSummery from './pages/pre-repayment/viewPre-RepaymentSummery';

import ReverseComponent from './pages/reverse/viewReverseComponent';
import ReverseSummery from './pages/reverse/viewReverseSummery';

import CloseAccountComponent from './pages/closeAccount/viewCloseAccountComponent';
import CloseAccountSummary from './pages/closeAccount/viewCloseAccountSummary';

import InqAggregateGLOutstandingComponent from './pages/inqAggregateGLOutstanding/viewInqAggregateGLOutstandingComponent';
import InqAggregateGLOutstandingSummery from './pages/inqAggregateGLOutstanding/viewInqAggregateGLOutstandingSummery';

class App extends Component {
    render() {
        const App = () => (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/list' component={List}/>

                    <Route path='/olaComponent' component={OpenAccountComponent}/>
                    <Route path='/olaSummary' component={OpenAccountSummery}/>

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

                    <Route path='/iarComponent' component={inquiryAccountingRecordsComponent}/>

                    <Route path='/ipprComponent' component={inquiryPrincipalReconciliationComponent}/>

                    <Route path='/iirComponent' component={inquiryInterestReconciliationComponent}/>

                    <Route path='/iprComponent' component={inquiryPenaltyReconciliationComponent}/>

                    <Route path='/iglComponent' component={inquiryGLReconciliationComponent}/>

                    <Route path='/ciaospComponent' component={calculateInstallmentAmountOfSpecificComponent}/>
                    <Route path='/ciaospSummery' component={calculateInstallmentAmountOfSpecificSummery}/>

                    <Route path='/pdComponent' component={preDisbursementComponent}/>
                    <Route path='/pdSummary' component={preDisbursementSummary}/>

                    <Route path='/prpmComponent' component={PreRepaymentComponent}/>
                    <Route path='/prpmSummary' component={PreRepaymentSummery}/>

                    <Route path='/rvComponent' component={ReverseComponent}/>
                    <Route path='/rvSummery' component={ReverseSummery}/>

                    <Route path='/caComponent' component={CloseAccountComponent}/>
                    <Route path='/caSummary' component={CloseAccountSummary}/>

                    <Route path='/iagloComponent' component={InqAggregateGLOutstandingComponent}/>
                    <Route path='/iagloSummary' component={InqAggregateGLOutstandingSummery}/>

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
