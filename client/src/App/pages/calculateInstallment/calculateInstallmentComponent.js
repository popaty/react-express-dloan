import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import DynamicHeader from '../Header.js';
import inputModel from './model.json';
//import SpinnerLoader from '../loading.js';

const cloneDeep = require('lodash.clonedeep');

class installmentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rq_body: {
                disbursement_amount: 0,
                number_of_payment: 0,
                interest_rate: 0,
                payment_frequency: 0,
                payment_unit: "",
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        if (JSON.parse(sessionStorage.getItem("inputData_installment"))) {
            const data = JSON.parse(sessionStorage.getItem("inputData_installment"));
            const body = {
                disbursement_amount: 0,
                number_of_payment: 0,
                interest_rate: data.interest_rate,
                payment_frequency: data.payment_frequency,
                payment_unit: data.payment_unit

            };
            this.setState({ rq_body: body });
            //console.log(this.state);
        }
    };

    handleChange(event) {
        //this.setState({[event.target.name]:event.target.value});
        const { rq_body } = { ...this.state };
        const currentState = rq_body;
        currentState[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
        this.setState({ rq_body: currentState });
    };

    handleSubmit(event) {
        event.preventDefault();
        //clone state for use in omit function.
        let body = cloneDeep(this.state);
        const request = this.omitfield(body);
        //console.log(request)
        this.postList(request);
    };

    omitfield = (body) => {
        for (let key in body.rq_body) {
            if (body.rq_body.hasOwnProperty(key)) {
                if (typeof body.rq_body[key] === "object") {
                    for (let subkey in body.rq_body[key]) {
                        if (body.rq_body[key].hasOwnProperty(subkey)) {
                            if (body.rq_body[key][subkey] === "" || body.rq_body[key][subkey] === 0) {
                                delete body.rq_body[key][subkey];
                            }
                        }
                    }
                    if (Object.keys(body.rq_body[key]).length === 0) {
                        delete body.rq_body[key];
                    }
                } else if (body.rq_body[key] === "" || body.rq_body[key] === 0) {
                    delete body.rq_body[key];
                }
            }
        }
        return body;
    };

    postList = (request) => {
        console.log("myRequest : " + JSON.stringify(request));
        let inputData = {
            number_of_payment: request.rq_body.number_of_payment,
            disbursement_amount: request.rq_body.disbursement_amount
        };
        fetch('/api/calculateInstallment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request),
        })
            .then(response => response.json())
            .then(data => {

                if (data.rs_body) {
                    sessionStorage.setItem("data_installment", JSON.stringify(data));
                    sessionStorage.setItem("input_installment", JSON.stringify(inputData));
                    window.open('/ciaSummary', '_self');
                } else {
                    alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                        + "error desc : " + data.errors.map(error => error.error_desc) + "\n"
                        + "error type : " + data.errors.map(error => error.error_type));
                }
            }).catch(error => console.log(error))

        //mock data
        // let data = {
        //     "rs_body": {
        //       "installment_amount": 15037.5
        //     }
        // };
        // const inputData = {number_of_payment : request.rq_body.number_of_payment, disbursement_amount : request.rq_body.disbursement_amount};
        // if (data.rs_body) {
        //     sessionStorage.setItem("data_installment", JSON.stringify(data));
        //     sessionStorage.setItem("input_installment", JSON.stringify(inputData));
        //     window.open('/ciaSummary', '_self');
        // }else{
        //     alert("error code : "+data.errors.map(error => error.error_code)+"\n"
        //         +"error desc : "+ data.errors.map(error => error.error_desc)+"\n"
        //         +"error type : "+ data.errors.map(error => error.error_type));
        // }
    };

    FormInputData = () => {
        return inputModel.model.map(item => {
            if (item.root === null) {
                return (
                    <FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                            value={this.state.rq_body[item.value]} onChange={this.handleChange} />
                    </FormGroup>
                );
            } else {
                return (
                    <FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                            value={this.state.rq_body[item.root][item.value]} onChange={this.handleChange} />
                    </FormGroup>
                );
            }
        });
    };

    render() {
        return (
            <div>
                <DynamicHeader />
                <br />
                <h2 align="center">Form Input Calculate Installment Amount</h2>
                <br />
                <Row>
                    <Col md={{ size: 4, offset: 4 }}>
                        <Form onSubmit={this.handleSubmit}>
                            {this.FormInputData()}
                            <br />
                            <div align="center">
                                <Button color="primary" type="submit" >Submit</Button>
                            </div>
                            <br />
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default installmentComponent;
