import React, { Component } from 'react';
import DynamicHeader from '../Header.js';
import SpinnerLoader from '../loading.js';
import '../form.css';
import utility from '../Utility.js';

import {
    Button,
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    UncontrolledDropdown
} from 'reactstrap';

import v000 from './v000.json';
import v001 from './v001.json';
import inputModel from './model.json';

const cloneDeep = require('lodash.clonedeep');

class OpenLoanAccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rq_body: {
                customer_number: "",
                customer_type: "",
                product_name: "",
                account_branch: 0,
                account_name: "",
                account_name_en: "",
                credit_limit: 0,
                term: 0,
                payment_type: "",
                payment_day: 0,
                payment_calculation_method: "minimum",
                interest_rate: 0,
                is_auto_payment: false,
                disbursement_target_account: "",
                repayment_source_account: "",
                loan_application_id: "",
                fee_amount:0,
                response_unit: 0,
                user_id: "",
                service_branch: 0  
            },
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadJson = this.loadJson.bind(this);
    };

    handleChange(event) {
        const { rq_body } = { ...this.state };
        const currentState = rq_body;

        if(event.target.name === "is_auto_payment"){
            currentState[event.target.name] = Boolean(event.target.value);
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

    loadJson(event) {
        event.preventDefault();
        switch(event.target.name){
            case "000" : this.setState(v000); break;
            case "001" : this.setState(v001); break;
        }
    };

    postList = (request) => {
        console.log("myRequest : " + JSON.stringify(request));
        fetch('/api/openLoanAccount', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })
            .then(response => response.json())
            .then(data => {
                if (data.rs_body) {
                    utility.clearSessionStorage("response_openLoanAccount");
                    sessionStorage.setItem("response_openLoanAccount", JSON.stringify(data));
                    window.open('/olaSummary', '_self');
                } else {
                    alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                        + "error desc : " + data.errors.map(error => error.error_desc));
                }
            }).catch(error => console.log(error))

        //mock data
        // let data = {
        //   "rs_body": {
        //     "account_number": "111111111555",
        //     "open_date": "2019-08-27"
        //   }
        // }
        // if (data.rs_body) {
        //     sessionStorage.setItem("response_openLoanAccount", JSON.stringify(data));
        //     window.open('/olaSummary', '_self');
        // } else {
        //   alert("error code : " + data.errors.map(error => error.error_code) + "\n"
        //     + "error desc : " + data.errors.map(error => error.error_desc));
        // }
    };

    FormInputRow1 = () => {
        let count = 0;
        let columnLeft = [];
        let columnRight = [];
        inputModel.model.map(item => {
            count++;
            if (item.root === null) {
                if (count % 2 !== 0) {
                    if (item.type === "select") {
                        columnLeft.push(
                            <FormGroup>
                                <Label>{item.label}</Label>
                                <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                    value={this.state.rq_body[item.value]} onChange={this.handleChange} >
                                    {item.items.map(element => <option>{element}</option>)}
                                </Input>
                            </FormGroup>
                        );
                    } else {
                        columnLeft.push(<FormGroup>
                            <Label>{item.label}</Label>
                            <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                value={this.state.rq_body[item.value]} onChange={this.handleChange} />
                        </FormGroup>
                        )
                    }
                } else {
                    columnRight.push(<FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                            value={this.state.rq_body[item.value]} onChange={this.handleChange} />
                    </FormGroup>
                    )
                }
            }
        })
        return (<Row><Col md={{ size: 3, offset: 3 }}>{columnLeft}</Col><Col md={{ size: 3 }}>{columnRight}</Col></Row>);
    };

    render() {
        const { loading } = this.state;
        return (
            <div>
                <DynamicHeader />
                <Container>
                    <h2>Form Input Open My Credits Loan Account</h2>
                    <UncontrolledDropdown align="center">
                        <DropdownToggle caret color="secondary">Select validation here &nbsp;</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name="000" onClick={this.loadJson}>Select validation here</DropdownItem>
                            <DropdownItem name="001" onClick={this.loadJson}>Input body Open Account Validation
                                001</DropdownItem>
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

export default OpenLoanAccountComponent;
