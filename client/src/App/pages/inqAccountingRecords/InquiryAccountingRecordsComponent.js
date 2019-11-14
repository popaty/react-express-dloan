import React, { Component } from 'react';
import DynamicHeader from '../Header.js';
import inputModel from './model.json';
// import utility from '../Utility.js';
import SpinnerLoader from '../loading.js';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import fieldHeader from './fieldRes.js'
// import dataResMock from './dataRes.js'
import Modal from '../modal'

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
            glEntryList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    };

    componentDidMount() {
        if (JSON.parse(sessionStorage.getItem("account_number"))) {
            this.setState({ account_number: JSON.parse(sessionStorage.getItem("account_number")) });
        }
    }

    handleChange(event) {
        // this.setState({ [event.target.name]: event.target.type === "number" ? Number(event.target.value) : event.target.value });
        this.setState({ [event.target.name]: event.target.value === "" ? null : event.target.value });
    };


    Clicked(event) {
        event.preventDefault();
        // console.log(this.state);
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false });
            fetch('/api/inquiryAccountingRecord/' + this.state.account_number + "/" + this.state.account_sequence + "/"
                + this.state.transaction_date + "/" + this.state.channel_post_date + "/" + this.state.job_id + "/"
                + this.state.service + "/" + this.state.transaction_id, {})
                .then(response => response.json())
                .then(data => {
                    // if (data.rs_body.gl_entry_list.length) {
                    if (data.rs_body.gl_entry_list.length > 0) {
                        // console.log(data.rs_body.gl_entry_list)
                        this.setState({
                            isFound: true,
                            glEntryLcdist: data.rs_body.gl_entry_list,
                        })
                    } else {
                        alert("Not Found.");
                    }
                    // utility.clearSessionStorage("response_inquiryAccountingRecord");
                    // sessionStorage.setItem("response_inquiryAccountingRecord", JSON.stringify(data.rs_body));
                    // window.open('/iarSummary', '_self');
                    // } else {
                    //     alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                    //         + "error desc : " + data.errors.map(error => error.error_desc) + "\n"
                    //         + "error type : " + data.errors.map(error => error.error_type));
                    // }
                }).catch(error => console.log(error));
        }, 1000);
    };

    FormInputData = () => {
        return inputModel.model.map(item => {
            if (item.type === "select") {
                return (
                    <Col xs="3">
                        <FormGroup>
                            <Label>{item.label}</Label>
                            <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                value={this.state[item.value]} onChange={this.handleChange} >
                                {item.items.map(element => <option>{element}</option>)}
                            </Input>
                        </FormGroup>
                    </Col >
                );
            } else {
                return (
                    <Col xs="3">
                        <FormGroup>
                            <Label>{item.label}</Label>
                            <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                                value={this.state[item.value]} onChange={this.handleChange} />
                        </FormGroup>
                    </Col>
                );
            }
        });
    };

    getHeaderTable = () => {
        let header = [];
        header.push(<th>#&nbsp;</th>);
        fieldHeader.gl_entry_list.map(item => {
            if (item === "trnRef" || item === "before_balance" || item === "first_payment_date"
                || item === "installment_amount" || item === "number_of_payment" ||
                item === "interest_index" || item === "interest_spread") {
                header.push(<th><u>{item}</u>&nbsp;</th>);
            } else {
                header.push(<th>{item}&nbsp;</th>);
            }
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
                        for (let inObj in data[index][ResHeader]) {
                            // eslint-disable-next-line
                            for (let keyInObj in data[index][ResHeader][inObj]) {
                                value[keyInObj] = data[index][ResHeader][inObj][keyInObj];
                            }
                        }
                    } else {
                        value[ResHeader] = data[index][ResHeader];
                    }
                }
                // eslint-disable-next-line
                for (let indexValue in value) {
                    obj.push(<td>{value[indexValue]}</td>);
                }
                // body.push(<tr onClick={() => this.searchJobID(tmp)}>{obj}</tr>);
                body.push(<tr onClick={e => { this.showModal() }}>{obj}</tr>);
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

    showModal = e => {
        this.setState({ statusModal: !this.state.statusModal });
    }

    searchJobID = (value) => {
        console.log(value.job_id);
        this.setState({ account_number: null,
                        account_sequence: null,
                        transaction_date: null, 
                        channel_post_date: null, 
                        job_id: value.job_id,
                        service: null,
                        transaction_id: null});

        // fetch('/api/inquiryAccountingRecord/' + this.state.account_number + "/" + this.state.account_sequence + "/"
        //     + this.state.transaction_date + "/" + this.state.channel_post_date + "/" + this.state.job_id + "/"
        //     + this.state.service + "/" + this.state.transaction_id, {})
        //     .then(response => response.json())
        //     .then(data => {
        //         // if (data.rs_body.gl_entry_list.length) {
        //             if (data.rs_body.gl_entry_list.length > 0) {
        //                 utility.clearSessionStorage("response_inquiryAccountingByRow");
        //                 sessionStorage.setItem("response_inquiryAccountingByRow", JSON.stringify(data.rs_body.gl_entry_list));
        //                 window.open('/iabjSummary');
        //             }else{
        //                 alert("Not Found.");
        //             }
        //     }).catch(error => console.log(error));
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
                            <Col xs="3">
                                <div class="text-center">
                                    <Button color="primary" style={{ marginTop: 30 }} type="submit" disabled={loading}>
                                        {loading && (<SpinnerLoader />)}
                                        {loading && <span>Loading..</span>}
                                        {!loading && <span>Submit</span>}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col>
                            <div class="table-responsive">
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
                </Container>
                <Modal show={this.state.statusModal} onClose={this.showModal} />
            </div>
        );
    }

}

export default InquiryAccountingRecordsComponent;