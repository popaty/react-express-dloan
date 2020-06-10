import React, { Component } from 'react';
import { Button, Container, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import DynamicHeader from '../Header.js';
import inputModel from './model.json';
import utility from '../Utility.js';

class InqAggregateGLOutstandingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            currency: null,
            cost_center: null,
            business_area: null,
            gl_account_number: null,
            business_product: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    }

    Clicked(event) {
        event.preventDefault();
        console.log(this.state);
        fetch('/api/inqAggregateGLOutstanding/' + this.state.date + "/" + this.state.currency +
        "/" + this.state.cost_center + "/" + this.state.business_area + "/" + this.state.gl_account_number +
        "/" + this.state.business_product, {}).then(response => response.json())
        .then(data => {
            if (data.rs_body) {
                utility.clearSessionStorage("response_inqAggregateGLOutstanding");
                sessionStorage.setItem("response_inqAggregateGLOutstanding", JSON.stringify(data.rs_body));
                window.open('/iagloSummary', '_self');
            } else {
                alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                    + "error desc : " + data.errors.map(error => error.error_desc));
            }

        }).catch(error => alert(error))

        // let data = {
        //     "rs_body": [
        //         {
        //             "date": "2019-09-12",
        //             "currency": "THB",
        //             "cost_center": "555",
        //             "gl_account_number": 2020,
        //             "business_product": "00000002",
        //             "daily_changed_outstanding_balance": 55,
        //             "daily_count_record": 2019,
        //             "ending_outstanding_balance": 5.55,
        //             "base_currency": "THB",
        //             "daily_changed_base_outstanding_balance": 703,
        //             "ending_base_outstanding_balance": 704,
        //             "profit_center": "0000006060"
        //         }
        //     ]
        // }

        // if (data.rs_body) {
        //     utility.clearSessionStorage("response_inqAggregateGLOutstanding");
        //     sessionStorage.setItem("response_inqAggregateGLOutstanding", JSON.stringify(data.rs_body));
        //     window.open('/iagloSummary', '_self');
        // } else {
        //     alert("error code : " + data.errors.map(error => error.error_code) + "\n"
        //         + "error desc : " + data.errors.map(error => error.error_desc));
        // }
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.type === "number" ? Number(event.target.value) : event.target.value });
    };

    FormInputData = () => {
        return inputModel.model.map(item => {
            return (
                <FormGroup>
                    <Label>{item.label}</Label>
                    <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                        value={this.state[item.value]} onChange={this.handleChange} />
                </FormGroup>
            );
        });
    };

    render() {
        return (
            <div>
                <DynamicHeader />
                <h2>Form Input Inquiry Aggregate GL Outstanding</h2>
                <Container>
                    <Row>
                        <Col md={{ size: 4, offset: 4 }}>
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
        )
    };
}

export default InqAggregateGLOutstandingComponent;
