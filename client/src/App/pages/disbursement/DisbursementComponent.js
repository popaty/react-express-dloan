import React, { Component } from 'react';
import {
    Button, Col, Container, Form, FormGroup, Input, Label, Row, Table, Modal, ModalBody, ModalHeader,
    DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown
} from 'reactstrap';

import DynamicHeader from '../Header.js';
import inputModel from './model.json';
import utility from '../Utility.js';
import SpinnerLoader from '../loading.js';

import data0 from './data0.json';
import data1 from './data1.json';
import data2 from './data2.json';

const cloneDeep = require('lodash.clonedeep');
let installmentAmount = "";
let numberOfPayment = "";

class disbursementComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rq_body: {
                account_number: 0,
                disbursement_amount: 0,
                effective_date: "",
                channel_post_date: "",
                currency_code: "THB",
                user_id: "",
                service_branch: 0,
                clearing_and_settlement_key: "CBS",
                number_of_payment: 0,
                installment_amount: 0,
                interest_index: "",
                interest_spread: 0,
                first_payment_date: "",
                payment_calculation_method: "installment"

            },
            loading: false,
            disabled: "",
            // openMyModal: false,
            date: "",
            interest_index: "FIXED",
            interest_spread: "",
            isFound: false,

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        let accountNumber = 0;
        let disbursementAmount = 0;
        let effectiveDate = '';
        let channelPostDate ='';
        let currencyCode = "THB";
        let userID = "";
        let serviceBranch = 0;
        let clearingAndSettlementKey = "CBS";
        let numberOfPayment = 0;
        let installmentAmount = 0;
        let interestIndex = "";
        let interestSpread = 0;
        let firstPaymentDate = "";
        let paymentCalculationMethod = "installment";

        if((JSON.parse(sessionStorage.getItem("request_preDisbursement")))){
            const requestPreDisbursement = JSON.parse(sessionStorage.getItem("request_preDisbursement"));
           
            accountNumber = requestPreDisbursement.account_number;
            disbursementAmount = requestPreDisbursement.disbursement_amount;
            effectiveDate = requestPreDisbursement.effective_date;
            channelPostDate = requestPreDisbursement.channel_post_date;
            currencyCode = requestPreDisbursement.currency_code;
            userID = requestPreDisbursement.user_id;
            serviceBranch = requestPreDisbursement.service_branch;
            clearingAndSettlementKey = requestPreDisbursement.clearing_and_settlement_key;
            numberOfPayment = requestPreDisbursement.number_of_payment;
            installmentAmount = requestPreDisbursement.installment_amount;
            interestIndex = requestPreDisbursement.interest_index;
            interestSpread = requestPreDisbursement.interest_spread;
            firstPaymentDate = requestPreDisbursement.first_payment_date;
            paymentCalculationMethod = requestPreDisbursement.payment_calculation_method;

        }else{
            if ((JSON.parse(sessionStorage.getItem("disburse_interest")))) {
                sessionStorage.removeItem("disburse_interest")
            }
    
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
        }

        const body = {
            account_number: accountNumber,
            disbursement_amount: disbursementAmount,
            effective_date: effectiveDate,
            channel_post_date: channelPostDate,
            currency_code: currencyCode,
            user_id: userID,
            service_branch: serviceBranch,
            clearing_and_settlement_key: clearingAndSettlementKey,
            interest_index: interestIndex,
            interest_spread: interestSpread,
            first_payment_date: firstPaymentDate,
            number_of_payment: numberOfPayment,
            installment_amount: installmentAmount,
            payment_calculation_method: paymentCalculationMethod
        };

        if (paymentCalculationMethod === "minimum") {
            body.installment_amount = "";
            body.number_of_payment = "";
            this.setState({ disabled: "disabled" });
        } else {
            body.installment_amount = installmentAmount;
            body.number_of_payment = numberOfPayment;
            this.setState({ disabled: "" });
        }
        this.setState({ rq_body: body });
    };

    handleChange(event) {
        const { rq_body } = { ...this.state };
        const currentState = rq_body;
        if (event.target.name === "payment_calculation_method") {
            //check drop down payment_calculation_method field
            currentState[event.target.name] = event.target.value;
            if (event.target.value === "minimum") {
                currentState["installment_amount"] = "";
                currentState["number_of_payment"] = "";
                this.setState({ disabled: "disabled" });
            } else {
                currentState["installment_amount"] = installmentAmount;
                currentState["number_of_payment"] = numberOfPayment;
                this.setState({ disabled: "" });
            }
        } else {
            currentState[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
        }
        this.setState({ rq_body: currentState });
    };

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });
        //clone state for use in omit function.
        let body = cloneDeep(this.state);

        if (body.rq_body.interest_index !== "" && body.rq_body.interest_spread === "") {
            body.rq_body.interest_spread = 1;
        }
        const request = utility.omit(body);

        if (body.rq_body.interest_spread === 1) {
            body.rq_body.interest_spread = "0";
        }

        setTimeout(() => {
            this.setState({ loading: false });
            this.postList(request);
        }, 1000)
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
    };

    FormInputRow1 = () => {
        let count = 0;
        let columnLeft = [];
        let columnRight = [];
        inputModel.model.map(item => {
            count++;
                if (count % 2 !== 0) {
                    if (item.type === "select") {
                        columnLeft.push(
                            <FormGroup>
                                <Label>{item.label}</Label>
                                <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                    value={this.state.rq_body[item.value]} onChange={this.handleChange}  >
                                    {item.items.map(element => <option>{element}</option>)}
                                </Input>
                            </FormGroup>
                        );
                    } else {
                        if (item.name === "number_of_payment") {
                            columnLeft.push(
                                <FormGroup>
                                    <Label>{item.label}</Label>
                                    <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                        value={this.state.rq_body[item.value]}
                                        onChange={this.handleChange} disabled={this.state.disabled} />
                                </FormGroup>
                            )
                        } else {
                            columnLeft.push(<FormGroup>
                                <Label>{item.label}</Label>
                                <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                    value={this.state.rq_body[item.value]} onChange={this.handleChange} />
                            </FormGroup>
                            )
                        }
                    }
                } else {
                    if (item.type === "select") {
                        columnRight.push(
                            <FormGroup>
                                <Label>{item.label}</Label>
                                <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                    value={this.state.rq_body[item.value]} onChange={this.handleChange} onInvalid > 
                                    {item.items.map(element => <option>{element}</option>)}
                                </Input>
                            </FormGroup>
                        );
                    } else {
                        if (item.name === "installment_amount") {
                            columnRight.push(
                                <FormGroup>
                                    <Label>{item.label}</Label>
                                    <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                        value={this.state.rq_body[item.value]}
                                        onChange={this.handleChange} disabled={this.state.disabled} />
                                </FormGroup>
                            )
                        } else {
                        columnRight.push(<FormGroup>
                            <Label>{item.label}</Label>
                            <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                value={this.state.rq_body[item.value]} onChange={this.handleChange} />
                        </FormGroup>
                        )
                    }
                }
                }
        })
        return (<Row><Col md={{ size: 3, offset: 3 }}>{columnLeft}</Col><Col md={{ size: 3 }}>{columnRight}</Col></Row>);
    }

    loadJson = (event) => {
        event.preventDefault();
        switch (event.target.name) {
            case "000": this.setState({ disabled: "",rq_body: data0.rq_body });break;
            case "001": {
                if(data1.rq_body.payment_calculation_method === "minimum"){
                    data1.rq_body.installment_amount = "";
                    data1.rq_body.number_of_payment = "";
                    this.setState({ disabled: "disabled", rq_body: data1.rq_body });
                }
                break;
            }
            case "002": {
                if(data2.rq_body.payment_calculation_method === "minimum"){
                    data2.rq_body.installment_amount = "";
                    data2.rq_body.number_of_payment = "";
                    this.setState({ disabled: "disabled", rq_body: data2.rq_body });
                }
                break;
            }
        }
    };

    render() {
        const { loading } = this.state;
        return (
            <div>
                <DynamicHeader />
                <h2>Form Input Disbursement</h2>
                <Container>
                    <UncontrolledDropdown align="center">
                        <DropdownToggle caret color="secondary">Select data here &nbsp;</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name="000" onClick={(e) => this.loadJson(e)}>Select data here</DropdownItem>
                            <DropdownItem name="001" onClick={(e) => this.loadJson(e)}>First Model</DropdownItem>
                            <DropdownItem name="002" onClick={(e) => this.loadJson(e)}>Second Model</DropdownItem>                          
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <Form onSubmit={this.handleSubmit}>
                        {this.FormInputRow1()}
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
        )
    };
}

export default disbursementComponent;
