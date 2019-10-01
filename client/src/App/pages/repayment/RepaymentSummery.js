import React, {Component} from 'react';
import {Col, Form, Alert} from 'reactstrap';
import DynamicHeader from '../Header.js';


class RepaymentSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        // const data = JSON.parse(sessionStorage.getItem("response_repayment"));
        return (
            <div className="App">
                <DynamicHeader/>
                <Form>
                    <h2>Form Data Repayment</h2>
                    <Col md={{size: 6, offset: 3}}>
                         <Alert color="success"><h3>Success!!</h3></Alert>
                    </Col>
                    <br/>
                    {/* <Button color="success" onClick={calculateInstallmentSummary.openDisbursement}>Disbursement</Button><br /> */}
                </Form>
            </div>
        );
    }
}

export default RepaymentSummery;
