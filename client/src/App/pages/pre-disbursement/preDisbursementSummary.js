import React, {Component} from 'react';
import {Col, Alert,Button} from 'reactstrap';
import DynamicHeader from '../Header.js';

class PreDisbursementSummary extends Component {

    static openDisbursement() {
        window.open('/dbmComponent', '_self');
    };

    render() {
        return (
            <div className="App">
                <DynamicHeader/>
                <h2>Form Data Pre-Disbursement</h2>
                <Col md={{size: 6, offset: 3}}>
                         <Alert color="success"><h3>Success!!</h3></Alert>
                </Col>
                <Button color="primary" onClick={PreDisbursementSummary.openDisbursement}>Disbursement</Button><br/>
            </div>
        );
    };
}

export default PreDisbursementSummary;