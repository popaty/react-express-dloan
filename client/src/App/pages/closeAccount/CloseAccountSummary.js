import React, {Component} from 'react';
import {Col, Form, Alert} from 'reactstrap';
import DynamicHeader from '../Header.js';

class CloseAccountSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };
    
    render() {
        return (
            <div className="App">
                <DynamicHeader/>
                <Form>
                    <h2>Form Data Close Account</h2>
                    <Col md={{size: 6, offset: 3}}>
                         <Alert color="success"><h3>Success!!</h3></Alert>
                    </Col>
                </Form>
            </div>
        );
    };

}

export default CloseAccountSummary;
