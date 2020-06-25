import React, { Component } from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row, InputGroup, InputGroupAddon, Table } from 'reactstrap';
import DynamicHeader from '../Header.js';
import inputModel from './model.json';
import utility from '../Utility.js';
import SpinnerLoader from '../loading.js';
const cloneDeep = require('lodash.clonedeep');
var list = [];
class ClAOfSpecificAccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rq_body: {
                account_number: 0,
                disbursement_amount: 0,
                number_of_payment_lists: []
            },
            number_of_payment: 0,
            statusList: false,
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (JSON.parse(sessionStorage.getItem("account_number"))) {
            this.setState({ account_number: JSON.parse(sessionStorage.getItem("account_number")) });
        }
    }
    handleChange(event) {
        event.preventDefault();
        const { rq_body } = { ...this.state };
        const currentState = rq_body;
        if (event.target.name !== "number_of_payment") {
            currentState[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
            this.setState({ rq_body: currentState });
        } else {
            this.setState({ number_of_payment: (event.target.type === "number") ? Number(event.target.value) : event.target.value });
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        const { rq_body } = { ...this.state };
        const currentState = rq_body;
        currentState.number_of_payment_lists = list;
        this.setState({ rq_body: currentState, loading: true });

        let body = cloneDeep(this.state);
        const request = utility.omit(body);
        setTimeout(() => {
            this.setState({ loading: false });
            this.postList(request);
        }, 1000)
    };

    postList = (request) => {
        console.log("myRequest : " + JSON.stringify(request));
        fetch('/api/calculateInstallmentOfSpecificAccount', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request),
            })
            .then(response => response.json())
            .then(data => {
                if (data.rs_body) {
                    utility.clearSessionStorage("response_installmentOfSpecificAccount");
                    sessionStorage.setItem("response_installmentOfSpecificAccount", JSON.stringify(data));
                    window.open('/ciaosaSummary', '_self');
                } else {
                    alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                        + "error desc : " + data.errors.map(error => error.error_desc) + "\n"
                        + "error type : " + data.errors.map(error => error.error_type));
                }
            }).catch(error => console.log(error))
    };

    addList(e) {
        e.preventDefault();
        this.setState({ statusList: true });
        let dataList = {
            number_of_payment: this.state.number_of_payment
        }
        list.push(dataList);
        console.log(list)
    }

    deleteList(e, index) {
        e.preventDefault();
        list.splice(index, 1);
        if(list.length === 0){
            this.setState({ statusList: false });
        }else{
            this.setState({ statusList: true });
        }
    }

    listBodyTable = () => {
        let body = [];
        let data = [];
        data = list.map((x) => x);
        for (let index in data) {
            let num = Number(index) + 1;
            body.push(<tr><td>{num}</td><td>{JSON.stringify(data[index])}<Button size="sm" style={{ marginBottom: 0, marginTop: 0, marginLeft: 20}} onClick={e => this.deleteList(e,index)} color="danger">Delete</Button></td></tr>);
        }
        return body;
    }

    FormInputData = () => {
        return inputModel.model.map(item => {
            if (item.root === null) {
                return (
                    <FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                            value={this.state[item.value]} onChange={this.handleChange} />
                    </FormGroup>
                );
            } else {
                return (
                    <FormGroup>
                        <Label>{item.label}</Label>
                        <InputGroup>
                            <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                value={this.state[item.value]} onChange={this.handleChange} />
                            <InputGroupAddon addonType="append">
                                <Button style={{ marginBottom: 0, marginTop: 0 }} onClick={e => this.addList(e)} color="info">Add</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                );
            }
        });
    };

    render() {
        const { loading } = this.state;
        return (
            <div>
                <DynamicHeader />
                <h2>Form Input Calculate Installment Amount Options of Specific Account</h2>
                <Container>
                    <Row>
                        <Col md={{ size: 4, offset: 4 }}>
                            <Form onSubmit={(e) => this.handleSubmit(e)}>
                                {this.FormInputData()}
                                {this.state.statusList && <Table striped bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th> Number of payment lists </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.listBodyTable()}
                                    </tbody>
                                </Table>}
                                <div class="text-center">
                                    <Button color="primary" type="submit" disabled={loading}>
                                        {loading && (<SpinnerLoader />)}
                                        {loading && <span>Loading..</span>}
                                        {!loading && <span>Submit</span>}
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ClAOfSpecificAccountComponent;
