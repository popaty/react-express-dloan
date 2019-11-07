import React, { Component } from 'react';
import DynamicHeader from '../Header.js';
import inputModel from './model.json';
import utility from '../Utility.js';
import SpinnerLoader from '../loading.js';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import fieldHeader from './fieldRes.js'
// import dataRes from './dataRes.js'

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
            glEntryList: [],
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
                    if (data.rs_body) {
                        if (data.rs_body.gl_entry_list.length > 0) {
                            console.log(data.rs_body.gl_entry_list)
                            this.setState({
                                isFound: true,
                                glEntryList: data.rs_body.gl_entry_list,
                            })
                        }
                        // utility.clearSessionStorage("response_inquiryAccountingRecord");
                        // sessionStorage.setItem("response_inquiryAccountingRecord", JSON.stringify(data.rs_body));
                        // window.open('/iarSummary', '_self');
                    } else {
                        alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                            + "error desc : " + data.errors.map(error => error.error_desc) + "\n"
                            + "error type : " + data.errors.map(error => error.error_type));
                    }
                    // },
                //     {
                //         "transaction_id": "4S8UG08LOtEiLk--0-1F-Go-2",
                //         "transaction_sequence": 2,
                //         "transaction_datetime": "2019-10-30T15:26:05+07:00",
                //         "transaction_date": "2019-10-30",
                //         "channel_post_date": "2019-08-25",
                //         "datetime_stamp": "2019-11-06T14:51:20+07:00",
                //         "job_id": "762c31b2-359b-4301-b864-26bf9e53cdde",
                //         "account_branch": 1,
                //         "service_branch": 1,
                //         "cost_center": "5",
                //         "transaction_account_type": "GL",
                //         "dr_cr": "C",
                //         "gl_account_number": 2731111,
                //         "transaction_amount": 100000.00,
                //         "currency": "THB",
                //         "base_amount": 100000.00,
                //         "base_currency": "THB",
                //         "clearing_and_settlement_key": "CBS",
                //         "business_product": "00000000",
                //         "business_area": "5555555555",
                //         "profit_center": "0000006060",
                //         "service": "disbursement",
                //         "other_prop": {
                //             "gl_entries_other_properties": {
                //                 "trnRef": "4S8UG08LOtEiLk--0-1F-Go-,1"
                //             },
                //             "trn_other_properties": {
                //                 "first_payment_date": "2019-08-31",
                //                 "installment_amount": "20483.56",
                //                 "number_of_payment": "5"
                //             }
                //         },
                //         "chrono_sequence": "1911061451203418592812256"
                //     },
                //     {
                //         "transaction_id": "4S8UG08LOtEiLk--0-1F-Go-3",
                //         "transaction_sequence": 3,
                //         "transaction_datetime": "2019-10-30T15:26:05+07:00",
                //         "transaction_date": "2019-10-30",
                //         "channel_post_date": "2019-08-25",
                //         "datetime_stamp": "2019-11-06T14:51:20+07:00",
                //         "job_id": "762c31b2-359b-4301-b864-26bf9e53cdde",
                //         "account_branch": 1,
                //         "service_branch": 1,
                //         "cost_center": "1",
                //         "transaction_account_type": "ITC",
                //         "dr_cr": "C",
                //         "gl_account_number": 1110000,
                //         "transaction_amount": 100000.00,
                //         "currency": "THB",
                //         "base_amount": 100000.00,
                //         "base_currency": "THB",
                //         "business_product": "00000000",
                //         "business_area": "1111111111",
                //         "profit_center": "0000001212",
                //         "service": "disbursement",
                //         "chrono_sequence": "1911061451203395102372256"
                //     },
                //     {
                //         "transaction_id": "4S8UG08LOtEiLk--0-1F-Go-4",
                //         "transaction_sequence": 4,
                //         "transaction_datetime": "2019-10-30T15:26:05+07:00",
                //         "transaction_date": "2019-10-30",
                //         "channel_post_date": "2019-08-25",
                //         "datetime_stamp": "2019-11-06T14:51:20+07:00",
                //         "job_id": "762c31b2-359b-4301-b864-26bf9e53cdde",
                //         "account_branch": 1,
                //         "service_branch": 1,
                //         "cost_center": "5",
                //         "transaction_account_type": "ITC",
                //         "dr_cr": "D",
                //         "gl_account_number": 1110000,
                //         "transaction_amount": 100000.00,
                //         "currency": "THB",
                //         "base_amount": 100000.00,
                //         "base_currency": "THB",
                //         "business_product": "00000000",
                //         "business_area": "5555555555",
                //         "profit_center": "0000006060",
                //         "service": "disbursement",
                //         "chrono_sequence": "1911061451203418592812256"
                //     }
                // ],
                // "has_more": false,
                // "last_index": "4"
        //         ]
        //     }
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
                || item === "installment_amount" || item === "number_of_payment") {
                header.push(<th><u>{item}</u>&nbsp;</th>);
            } else {
                header.push(<th>{item}&nbsp;</th>);
            }
        })
        return header;
    };

    getBodyTable = () => {
        let body = [];
        let children = [];
        let dict = new Object();
        let dataRes = this.state.glEntryList;
        fieldHeader.gl_entry_list.map(item => {
            dict[item] = "";
        })
        console.log(Object.keys(dict).length)
        for (let i = 0; i < dataRes.length; i++) {
            for (let key in dataRes[i]) {
                dict[key] = dataRes[i][key]
            }
            children.push(<td>{i + 1}</td>)
            for (let j = 0; j < Object.keys(dict).length - 1; j++) {
                children.push(<td>{dict[fieldHeader.gl_entry_list[j]]}</td>)
                // console.log("Test",dict[fieldHeader.gl_entry_list[j]])
            }
            console.log("TestChildren : ", children.length)
            body.push(<tr>
                {children}
            </tr>);
            children = [];
            console.log("TestChildren : ", children.length)
        }

        console.log("TestBody : ", body.length)
        return body;
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
                                <Table bordered>
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
            </div>
        );
    }

}

export default InquiryAccountingRecordsComponent;