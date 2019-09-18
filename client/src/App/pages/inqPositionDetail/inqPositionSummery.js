import React, { Component } from 'react';
import { Button, Col, Table, Row } from 'reactstrap';
import DynamicHeader from '../Header.js';

class inqPositionSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    CallInquiryLoanAccount() {
        var data = JSON.parse(sessionStorage.getItem("data_inqLoanAccount"));
        //console.log(data.account_number);
        fetch('/api/inqLoanAccount/' + data.account_number, {}).then(response => response.json())
            .then(data => {
               // console.log(data);
                if (data.rs_body) {
                    sessionStorage.setItem("data_inqLoanAccount", JSON.stringify(data.rs_body));
                    window.open('/ilaSummary', '_self');
                } else {
                    alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                        + "error desc : " + data.errors.map(error => error.error_desc));
                }

            }).catch(error => console.log(error))

        //mockdata
        // let data = {
        //     "rs_body": {
        //         "account_number": "111111111103",
        //         "product_name": "7200120090001",
        //         "customer_number": "12111111111",
        //         "customer_type": "0702",
        //         "account_name": "นางสาวกานดา มาดีไกล",
        //         "currency": "THB",
        //         "account_branch": 1,
        //         "response_unit": 2,
        //         "credit_term_number": 12,
        //         "credit_term_unit": "M",
        //         "disbursement_account": "20000002010",
        //         "open_date": "2019-08-23",
        //         "application_id": "APP0001",
        //         "closed_date": "",
        //         "limit": {
        //             "credit_limit": 100000,
        //             "balance": 100000,
        //             "available_balance": 100000,
        //             "maturity_date": "2020-08-19"
        //         },
        //         "payment": {
        //             "payment_frequency": 1,
        //             "payment_unit": "M",
        //             "payment_date": 31,
        //             "payment_calculation_method": "installment",
        //             "billing_offset_day": 1,
        //             "deduction_account": "20000002010"
        //         },
        //         "interest": {
        //             "interest_index": "MRR",
        //             "interest_spread": 12,
        //             "interest_rate": 19.12,
        //             "penalty_index": "pen",
        //             "penalty_rate": 28,
        //             "grace_day": 5,
        //             "is_catch_up": true
        //         }
        //     }
        // };
        // if (data.rs_body) {
        //     sessionStorage.setItem("data_inqLoanAccount", JSON.stringify(data.rs_body));
        //     window.open('/ilaSummary', '_self');
        // } else {
        //     alert("error code : " + data.errors.map(error => error.error_code) + "\n"
        //         + "error desc : " + data.errors.map(error => error.error_desc));
        // }
    };

    getHeaderTable = (data) => {
        let header = [];
        if (data.length > 1) {
            header.push(<th>#&nbsp;</th>);
            for (let key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                    header.push(<th>{key}&nbsp;</th>);
                }
            }
        } else {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    header.push(<th>#&nbsp;</th>);
                    for (let keyinObj in data[key]) {
                        if (data[key].hasOwnProperty(keyinObj)) {
                            header.push(<th>{keyinObj}&nbsp;</th>);
                        }
                    }
                }
            }
        }
        return header;
    };

    getBodyTable = (data) => {
        let body = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                var num = Number(key);
                let obj = [];
                obj.push(<td>{num + 1}</td>);
                for (let keyinObj in data[key]) {
                    if (data[key].hasOwnProperty(keyinObj)) {
                        if (typeof data[key][keyinObj] === "boolean") {
                            var catchup = String(data[key][keyinObj]);
                            obj.push(<td>{catchup}</td>)
                        } else {
                            obj.push(<td>{data[key][keyinObj]}</td>);
                        }
                    }
                }
                body.push(<tr>{obj}</tr>);
            }
        }
        return body;
    };

    render() {
        const data = JSON.parse(sessionStorage.getItem("data_inqPositionDetail"));
        //console.log(data);
        return (
            <div className="App">
                <DynamicHeader />
                <form>
                    <br />
                    <h2>Form Data Inquiry Position Detail</h2>
                    <br />
                    <Row>
                        <Col md={{ size: 8, offset: 2 }} >
                            <div class="table-responsive">
                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                            {this.getHeaderTable(data)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getBodyTable(data)}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                    <br />
                    {/* <Button color="success" onClick={this.Clicked}>Inquiry Interest Accrued</Button><br /><br /> */}
                    <Button color="success" onClick={this.CallInquiryLoanAccount}>Inquiry Account Details </Button>
                </form>
            </div>
        );
    }
}
export default inqPositionSummery;