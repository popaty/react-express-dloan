import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Container, Row} from 'reactstrap';
import DynamicHeader from '../Header.js';
import inputModel from './model.json';

class inquiryInterestComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
           account_number: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    }

    Clicked(event) {
        event.preventDefault();
        //console.log(this.state);
        fetch('/api/inqInterestAccrued/' + this.state.account_number, {}).then(response => response.json())
            .then(data => {
                if (data.rs_body) {
                    // value = {...data.rs_body.position_detail.map(item => item)};
                    //console.log(value);
                    sessionStorage.setItem("response_inqInterastaAccrued", JSON.stringify(data.rs_body.position_detail));
                    window.open('/iiaSummary', '_self');
                } else {
                    alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                        + "error desc : " + data.errors.map(error => error.error_desc) + "\n"
                        + "error type : " + data.errors.map(error => error.error_type));
                }
            }).catch(error => console.log(error))

        //mock data
        // let data = {
        //     "rs_body": {
        //         "position_detail": [
        //             {
        //                 "account_number": 600000000032,
        //                 "account_sequence": 1,
        //                 "interest_index": "MRR",
        //                 "interest_spread": -3.00000,
        //                 "penalty_index": "PEN",
        //                 "open_date": "2019-09-12",
        //                 "open_datetime_stamp": "2019-09-12T11:19:10Z",
        //                 "grace_day": 5,
        //                 "is_catch_up": true,
        //                 "customer_type": "0703",
        //                 "account_branch": 20,
        //                 "daily_accrued_amount": 0.10959,
        //                 "unpaid_accrued_amount": 0.00000
        //             },
        //             {
        //                 "account_number": 600000000033,
        //                 "account_sequence": 2,
        //                 "interest_index": "MRR",
        //                 "interest_spread": -4.00000,
        //                 "penalty_index": "PEN",
        //                 "open_date": "2019-09-13",
        //                 "open_datetime_stamp": "2019-09-12T11:19:10Z",
        //                 "grace_day": 6,
        //                 "is_catch_up": false,
        //                 "customer_type": "0704",
        //                 "account_branch": 21,
        //                 "daily_accrued_amount": 0.10959,
        //                 "unpaid_accrued_amount": 0.00000
        //             }
        //         ]
        //     }
        // }
        // sessionStorage.setItem("response_inqInterastaAccrued", JSON.stringify(data.rs_body.position_detail));
        // window.open('/iiaSummary', '_self');
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.type === "number" ? Number(event.target.value) : event.target.value});
    }

    FormInputData = () => {
        return inputModel.model.map(item => {
                return (
                    <FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                               value={this.state[item.value]} onChange={this.handleChange}/>
                    </FormGroup>
                );
        });
    };

    render() {
        return (
            <div>
                <DynamicHeader/>
                <h2>Form Input Inquiry Interest Accrued</h2>
                <br/>
                <Container>
                    <Row>
                        <Col md={{size: 4, offset: 4}}>
                            <Form onSubmit={this.Clicked}>
                                {this.FormInputData()}
                                <div class="text-center">
                                    <Button color="primary" type="submit">Submit</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    };
}

export default inquiryInterestComponent;
