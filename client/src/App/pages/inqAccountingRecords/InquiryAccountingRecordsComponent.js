import React, { Component } from 'react';
import DynamicHeader from '../Header.js';
import inputModel from './model.json';
import SpinnerLoader from '../loading.js';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import fieldHeader from './fieldRes.js'
// import dataResMock from './mockDataRes.js'
import Modal from '../modal'
const cloneDeep = require('lodash.clonedeep');
 
class InquiryAccountingRecordsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account_number: null,
            account_sequence: null,
            service: null,
            transaction_date: null,
            channel_post_date: null,
            transaction_id: null,
            job_id: null,
            
            loading: false,
            isFound: false,
            statusModal: false,
            glEntryList: [],
            dataResponse: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    };

    componentDidMount() {
        if (JSON.parse(sessionStorage.getItem("account_number"))) {
            this.setState({ account_number: JSON.parse(sessionStorage.getItem("account_number"))});
        }
    };

    handleChange(event) {
        // this.setState({ [event.target.name]: event.target.type === "number" ? Number(event.target.value) : event.target.value });
        this.setState({ [event.target.name]: event.target.value === "" ? null : event.target.value });
    };

    Clicked(event) {
        event.preventDefault();
         console.log(this.state);
        this.setState({ loading: true,glEntryList : []});
        setTimeout(() => {
            fetch('/api/inquiryAccountingRecord/' + this.state.account_number + "/" + this.state.account_sequence + "/"
                + this.state.transaction_date + "/" + this.state.channel_post_date + "/" + this.state.job_id + "/"
                + this.state.service + "/" + this.state.transaction_id, {})
                .then(response => response.json())
                .then(data => {
                    // if (data.rs_body.gl_entry_list.length) {
                    if (data.rs_body.gl_entry_list.length > 0) {
                        this.setState({
                            loading: false,
                            isFound: true,
                            glEntryList: data.rs_body.gl_entry_list})
                    } else {
                        alert("Not Found.");
                    }
                }).catch(error => console.log(error));
                this.setState({loading: false});
        }, 1000);
    };

    FormInputData = () => {
        let countElement = 0;
        return inputModel.model.map(item => {
            if (item.type === "select") {
                return (
                    <Col md="3">
                        <FormGroup>
                            <Label>{item.label}</Label>
                            <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                value={this.state[item.value]} onChange={this.handleChange} >
                                {item.items.map(element => {
                                    countElement++;
                                    if(countElement === 1){
                                        return (<option value="">{element}</option>);
                                    }else{
                                        return (<option>{element}</option>);
                                    }
                                })}
                            </Input>
                        </FormGroup>
                    </Col >
                );
            } else {
                return (
                    <Col md="3">
                        <FormGroup>
                            <Label>{item.label}</Label>
                            <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                value={this.state[item.value]} onChange={this.handleChange} />
                        </FormGroup>
                    </Col>
                );
            }
        })
    };

    getHeaderTable = () => {
        let header = [];
        header.push(<th>#&nbsp;</th>);
        fieldHeader.gl_entry_list.map(item => {
            header.push(<th>{item}&nbsp;</th>);
        })
        return header;
    };

    getBodyTable = () => {
        let data = this.state.glEntryList;
        let body = [];
        // eslint-disable-next-line
        for (let index in data) {
            let num = Number(index) + 1;
            let obj = [];
            obj.push(<td>{num}</td>);
            let value = this.getFieldHeader();
            if (data.hasOwnProperty(index)) {
                // eslint-disable-next-line
                for (let ResHeader in data[index]) {
                    if (typeof data[index][ResHeader] === "object") {
                        // eslint-disable-next-line
                        let tmp = []
                        for (let inObj in data[index][ResHeader]) {
                            // eslint-disable-next-line
                            for (let keyInObj in data[index][ResHeader][inObj]) {
                                tmp.push(keyInObj+" : "+data[index][ResHeader][inObj][keyInObj]);
                            }
                        }
                        value[ResHeader] = tmp.join(" | ");
                    } else {
                        value[ResHeader] = data[index][ResHeader];
                    }
                }
                // console.log(value);
                // eslint-disable-next-line
                for (let indexValue in value) {
                    if (indexValue === "job_id" || indexValue === "transaction_id") {
                        obj.push(<td onClick={e => { this.showModal(indexValue, value[indexValue]) }}><u>{value[indexValue]}</u></td>);
                    } else {
                        obj.push(<td>{value[indexValue]}</td>);
                    }
                }
                body.push(<tr>{obj}</tr>);
            }
        }
        return body;
    };

    getFieldHeader = () => {
        let key = {};
        fieldHeader.gl_entry_list.map(item => {
            key[item] = "";
        })
        return key;
    };

    showModal = (key, value) => {
        this.setState({ statusModal: !this.state.statusModal });
        if (!this.state.statusModal) {
            this.inqByJobIDAndTranID(key, value);
        }
    }

    inqByJobIDAndTranID = (key, value) => {
        let stateNew = cloneDeep(this.state);
        if (key === "job_id") {
            stateNew.account_number = null;
            stateNew.account_sequence = null;
            stateNew.transaction_date = null;
            stateNew.channel_post_date = null;
            stateNew.job_id = value;
            stateNew.service = null;
            stateNew.transaction_id = null;
            // this.setState({
            //     dataResponse: [],
            //     account_number: null,
            //     account_sequence: null,
            //     transaction_date: null,
            //     channel_post_date: null,
            //     job_id: value,
            //     service: null,
            //     transaction_id: null
            // });
        } else {
            stateNew.account_number = null;
            stateNew.account_sequence = null;
            stateNew.transaction_date = null;
            stateNew.channel_post_date = null;
            stateNew.job_id = null;
            stateNew.service = null;
            stateNew.transaction_id = value;
            // this.setState({
            //     dataResponse: [],
            //     account_number: null,
            //     account_sequence: null,
            //     transaction_date: null,
            //     channel_post_date: null,
            //     job_id: null,
            //     service: null,
            //     transaction_id: value
            // });
        }
        fetch('/api/inquiryAccountingRecord/' + stateNew.account_number + "/" + stateNew.account_sequence + "/"
            + stateNew.transaction_date + "/" + stateNew.channel_post_date + "/" + stateNew.job_id + "/"
            + stateNew.service + "/" + stateNew.transaction_id, {})
            .then(response => response.json())
            .then(data => {
                if (data.rs_body.gl_entry_list.length > 0) {
                    this.setState({
                        dataResponse: []
                   });
                    this.setState({
                         dataResponse: data.rs_body.gl_entry_list
                    });
                } else {
                    alert("Not Found.");
                }
            }).catch(error => console.log(error));
    };

    render() {
        const { loading } = this.state;
        return (
            <div>
                <DynamicHeader />
                <h2>Form Input Inquiry Accounting Record</h2>
                <Container>
                    <Form onSubmit={this.Clicked}>
                        <Row>
                            {this.FormInputData()}
                            <Col md="3">
                                <div class="text-center">
                                    <Button color="primary" style={{ marginTop: 30 }} type="submit" disabled={loading}>
                                        {loading && (<SpinnerLoader />)}
                                        {loading && <span>Loading..</span>}
                                        {!loading && <span>Submit</span>}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div class="table-responsive" style={{ marginBottom: 50, marginTop: 30 }} >
                                    <Table hover bordered>
                                        <thead>
                                            <tr>
                                                {this.getHeaderTable()}
                                            </tr>
                                        </thead>
                                        {this.state.isFound && <tbody>
                                            {this.getBodyTable()}
                                        </tbody>}
                                    </Table>
                                    <div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <Modal show={this.state.statusModal} onClose={this.showModal} data={this.state.dataResponse} />
            </div>
        )
    };
}

export default InquiryAccountingRecordsComponent;