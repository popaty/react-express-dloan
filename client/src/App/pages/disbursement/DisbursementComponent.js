import React, { Component } from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import DynamicHeader from '../Header.js';
import inputModel from './model.json';
import utility from '../Utility.js';
import SpinnerLoader from '../loading.js';

const cloneDeep = require('lodash.clonedeep');
let installmentAmount = "";
let numberOfPayment = "";

class disbursementComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rq_body: {
                account_number: "",
                disbursement_amount: 0,
                effective_date: "",
                channel_post_date: "",
                currency_code: "THB",
                service_branch: 0,
                clearing_and_settlement_key: "",
                other_properties: {
                    interest_index: "",
                    interest_spread: 0,
                    first_payment_date: "",
                    number_of_payment: 0,
                    installment_amount: 0,
                    payment_calculation_method: "installment"
                }
            },
            loading: false,
            disabled: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        let disbursementAmount = 0
        let accountNumber = "";

        if (JSON.parse(sessionStorage.getItem("response_installment"))) {
            const dataInstallment = JSON.parse(sessionStorage.getItem("response_installment"));
            installmentAmount = dataInstallment.rs_body.installment_amount;
        } else {
            console.log("sessionStorage response_installment not found!");
        }

        if (JSON.parse(sessionStorage.getItem("request_disbursement"))) {
            const inputDisbursement = JSON.parse(sessionStorage.getItem("request_disbursement"));
            disbursementAmount = inputDisbursement.disbursement_amount;
            numberOfPayment = inputDisbursement.number_of_payment;
        } else {
            console.log("sessionStorage request_disbursement not found!");
        }

        if (JSON.parse(sessionStorage.getItem("account_number"))) {
            const account = JSON.parse(sessionStorage.getItem("account_number"));
            accountNumber = account;
        } else {
            console.log("sessionStorage account_number not found!");
        }
        const body = {
            account_number: accountNumber,
            disbursement_amount: disbursementAmount,
            effective_date: "",
            channel_post_date: "",
            currency_code: "THB",
            service_branch: 0,
            clearing_and_settlement_key: "CBS",
            other_properties: {
                interest_index: "",
                interest_spread: 0,
                first_payment_date: "",
                number_of_payment: String(numberOfPayment),
                installment_amount:String(installmentAmount),
                payment_calculation_method: "installment"
            }
        };
        this.setState({ rq_body: body });
    };

    handleChange(event) {
        //this.setState({[event.target.name]:event.target.value});
        const { rq_body } = { ...this.state };
        const currentState = rq_body;
        const properties = currentState.other_properties;
        if (event.target.name === "interest_index" || event.target.name === "interest_spread"
            || event.target.name === "first_payment_date" || event.target.name === "number_of_payment"
            || event.target.name === "installment_amount") {
            
            properties[event.target.name] = event.target.value;

        } else if (event.target.name === "payment_calculation_method"){
            //check drop down payment_calculation_method field
            properties[event.target.name] = event.target.value;
            if(event.target.value === "minimum"){
                properties["installment_amount"] = "";
                properties["number_of_payment"] = "";
                this.setState({disabled : "disabled"});
            }else{
                properties["installment_amount"] = String(installmentAmount);
                properties["number_of_payment"] = String(numberOfPayment);
                this.setState({disabled : ""});
            }
        }else{
            currentState[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
        }
        this.setState({ rq_body: currentState });
    };

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });
        //clone state for use in omit function.
        let body = cloneDeep(this.state);
        const request = utility.omit(body);
        // console.log(request);
        setTimeout(() => {
             this.setState({ loading: false });
             this.postList(request);
        }, 1000);
    };

    postList = (request) => {
        console.log("myRequest : " + JSON.stringify(request));
        fetch('/api/disbursement', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request),
        }).then(response => response.json())
            .then(data => {

                if (data.rs_body) {
                    utility.clearSessionStorage("response_disbursement");
                    sessionStorage.setItem("response_disbursement", JSON.stringify(data));
                    window.open('/dbmSummary', '_self');
                } else {
                    alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                        + "error desc : " + data.errors.map(error => error.error_desc) + "\n"
                        + "error type : " + data.errors.map(error => error.error_type));
                }
            }).catch(error => console.log(error))

        //mock data
        // let data =  {"rs_body":{"account_number":600000000067,"account_sequence":1,"balance":1000.00}}
        // if (data.rs_body) {
        //         sessionStorage.setItem("response_disbursement",JSON.stringify(data));
        //         window.open('/dbmSummary', '_self');
        // } else {
        //     alert("error code : " + data.errors.map(error => error.error_code) + "\n"
        //     + "error desc : " + data.errors.map(error => error.error_desc) + "\n"
        //     + "error type : " + data.errors.map(error => error.error_type));
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
                if (item.type === "select") {
                    return (
                            <FormGroup>
                                <Label>{item.label}</Label>
                                <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                    value={this.state.rq_body[item.root][item.value]} onChange={this.handleChange} >
                                    {item.items.map(element => <option>{element}</option>)}
                                </Input>
                            </FormGroup>
                    );
                } else {
                    if(item.name === "installment_amount" || item.name ==="number_of_payment"){
                        return (
                                <FormGroup>
                                    <Label>{item.label}</Label>
                                    <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                         value={this.state.rq_body[item.root][item.value]}
                                         onChange={this.handleChange} disabled={this.state.disabled} />
                                </FormGroup>
                        );
                    }else{
                        return (
                                <FormGroup>
                                    <Label>{item.label}</Label>
                                    <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                        value={this.state.rq_body[item.root][item.value]} onChange={this.handleChange} />
                                </FormGroup>
                        );
                    }
                }
            }
        });
    };

    render() {
        const { loading } = this.state;
        return (
            <div>
                <DynamicHeader />
                <h2>Form Input Disbursement</h2>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col md={{ size: 4, offset: 4 }}>
                                {this.FormInputData()}
                            </Col>
                        </Row>
                        <div class="text-center">
                            <Button color="primary" type="submit" disabled={loading}>
                                {loading && (<SpinnerLoader />)}
                                {loading && <span>Loading..</span>}
                                {!loading && <span>Submit</span>}
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        );
    };
}

export default disbursementComponent;
