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

// import v000 from './v000.json';
// import v001 from './v001.json';
// import v002 from './v002.json';
// import v003 from './v003.json';
// import v004 from './v004.json';
// import v005 from './v005.json';
import demoS16C1 from './demoS16C1.json';
import inputModel from './model.json';

const cloneDeep = require('lodash.clonedeep');

class OpenLoanAccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rq_body: {
                customer_number: "",
                customer_type: "",
                account_name: "",
                account_name_en: "",
                credit_limit: 0,
                credit_term_number: 0,
                credit_term_unit: "",
                product_name: "",
                disbursement_account: "",
                deduction_account: "",
                account_branch: 0,
                response_unit: 0,
                application_id: "",
                user_id:"",
                service_branch:0,
                interest: {
                    interest_index: "",
                    interest_spread: 0
                },
                payment: {
                    payment_frequency: 0,
                    payment_unit: "",
                    payment_date: 0,
                    payment_calculation_method: "",
                    max_installment_amount : 0
                }
            },
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadJson = this.loadJson.bind(this);
    };

    handleChange(event) {
        //this.setState({[event.target.name]:event.target.value});
        const { rq_body } = { ...this.state };
        const currentState = rq_body;
        const interest = currentState.interest;
        const payment = currentState.payment;

        if (event.target.name === "interest_index" || event.target.name === "interest_spread") {
            interest[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
        } else if (event.target.name === "payment_frequency" || event.target.name === "payment_unit" ||
            event.target.name === "payment_date" || event.target.name === "billing_offset_day"
            || event.target.name === "payment_calculation_method" || event.target.name === "max_installment_amount") {

            payment[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
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
        const request = utility.omit(body);
        // console.log(request);
        setTimeout(() => {
            this.setState({ loading: false });
            this.postList(request);
        }, 1000);
    };

    loadJson(event) {
        switch(event.target.name){
            // case "000" : this.setState(v000); break;
            // case "001" : this.setState(v001); break;
            // case "002" : this.setState(v002); break;
            // case "003" : this.setState(v003); break;
            // case "004" : this.setState(v004); break;
            // case "005" : this.setState(v005); break;
            case "S16C1" : this.setState(demoS16C1); break;
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
                    columnLeft.push(<FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                            value={this.state.rq_body[item.value]} onChange={this.handleChange} />
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
        })
        return (<Row><Col md={{ size: 3, offset: 3 }}>{columnLeft}</Col><Col md={{ size: 3 }}>{columnRight}</Col></Row>);
    };

    FormInputRow2 = () => {
        let count = 0;
        let columnLeft = [];
        let columnRight = [];
        inputModel.model.map(item => {
            count++;
            if (item.root !== null && item.root === "interest") {
                if (count % 2 !== 0) {
                    columnLeft.push(<FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                            value={this.state.rq_body[item.root][item.value]} onChange={this.handleChange} />
                    </FormGroup>
                    )
                } else {
                    columnRight.push(<FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                            value={this.state.rq_body[item.root][item.value]} onChange={this.handleChange} />
                    </FormGroup>
                    )
                }
            }
        })
        return (<Row><Col md={{ size: 3, offset: 3 }}>{columnLeft}</Col><Col md={{ size: 3 }}>{columnRight}</Col></Row>);
    };

    FormInputRow3 = () => {
        let count = 0;
        let columnLeft = [];
        let columnRight = [];
        inputModel.model.map(item => {
            if (item.root !== null && item.root === "payment") {
                count++;
                if (count % 2 !== 0) {
                    if (item.type === "select") {
                        columnLeft.push(
                            <FormGroup>
                                <Label>{item.label}</Label>
                                <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                    value={this.state.rq_body[item.root][item.value]} onChange={this.handleChange} >
                                    {item.items.map(element => <option>{element}</option>)}
                                </Input>
                            </FormGroup>
                        );
                    } else {
                        columnLeft.push(<FormGroup>
                            <Label>{item.label}</Label>
                            <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                value={this.state.rq_body[item.root][item.value]} onChange={this.handleChange} />
                        </FormGroup>
                        )
                    }
                } else {
                    columnRight.push(<FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                            value={this.state.rq_body[item.root][item.value]} onChange={this.handleChange} />
                    </FormGroup>
                    );
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
                    <h2>Form Input Open Account</h2>
                    <UncontrolledDropdown align="center">
                        <DropdownToggle caret color="secondary">Select validation here &nbsp;</DropdownToggle>
                        <DropdownMenu>
                            {/* <DropdownItem name="000" onClick={this.loadJson}>Select input body open account</DropdownItem> */}
                            {/* <DropdownItem name="001" onClick={this.loadJson}>Input body Open Account Validation
                                001</DropdownItem>
                            <DropdownItem name="002" onClick={this.loadJson}>Input body Open Account Validation
                                002</DropdownItem>
                            <DropdownItem name="003" onClick={this.loadJson}>Input body Open Account Validation
                                003</DropdownItem>
                            <DropdownItem name="004" onClick={this.loadJson}>[DEMO1]Input body Open Account Validation
                                004</DropdownItem>
                            <DropdownItem name="005" onClick={this.loadJson}>[DEMO2]Input body Open Account Validation
                                005</DropdownItem> */}
                            <DropdownItem name="S16C1" onClick={this.loadJson}>Input body Open Account Sprint#16 Case 1</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <Form onSubmit={this.handleSubmit}>

                        {this.FormInputRow1()}
                        <h4>Interest</h4>
                        <hr />
                        {this.FormInputRow2()}
                        <h4>Payment</h4>
                        <hr />
                        {this.FormInputRow3()}

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
