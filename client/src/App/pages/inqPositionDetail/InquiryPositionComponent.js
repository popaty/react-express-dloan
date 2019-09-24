import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import DynamicHeader from '../Header.js';

class inquiryPositionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    }

    componentDidMount() {
        if(JSON.parse(sessionStorage.getItem("data_inqLoanAccount"))){
            const datainqLoanAccount = JSON.parse(sessionStorage.getItem("data_inqLoanAccount"));
            this.setState({account : datainqLoanAccount.account_number});
        }
    }

    handleChange(event) {
        this.setState({ account: event.target.value });
    }

    Clicked(event) {
        event.preventDefault();
        fetch('/api/inquiryPositionDetail/' + this.state.account)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    //wait
                    sessionStorage.setItem("data_inqPositionDetail", JSON.stringify(data));
                    window.open('/ipdSummary', '_self');
                } else {
                    alert("Data not found.");
                }
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="App">
                <DynamicHeader />
                <h2>Form Input Inquiry Position Detail</h2>
                <br />
                <Row>
                    <Col md={{ size: 5, offset: 4 }}>
                        <Form inline onSubmit={this.Clicked}>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label>Account Number : &nbsp;</Label>
                                <Input type="text" value={this.state.account}  placeholder="Enter account number" onChange={this.handleChange} />
                            </FormGroup>
                            <Button color="primary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default inquiryPositionComponent;
