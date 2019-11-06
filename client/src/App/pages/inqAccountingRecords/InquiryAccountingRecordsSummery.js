import React, { Component } from 'react';
import { Col, Form, Table } from 'reactstrap';
import DynamicHeader from '../Header.js';
// import utility from '../Utility.js';

class inquiryAccountingRecordsSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.searchJobID = this.searchJobID.bind(this);
    }

    getHeaderTable = (data) => {
        let header = [];
        if (data.length > 1) {
            header.push(<th>#&nbsp;</th>);
            // eslint-disable-next-line
            for (let key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                    if (typeof data[0][key] === "object") {
                        // eslint-disable-next-line
                        for (let inObj in data[0][key]) {
                            header.push(<th><u>{inObj}</u>&nbsp;</th>);
                        }
                    } else {
                        header.push(<th>{key}&nbsp;</th>);
                    }
                }
            }
        } else {
            // eslint-disable-next-line
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    header.push(<th>#&nbsp;</th>);
                    // eslint-disable-next-line
                    for (let keyinObj in data[key]) {
                        if (data[key].hasOwnProperty(keyinObj)) {
                            if (typeof data[key][keyinObj] === "object") {
                                // eslint-disable-next-line
                                for (let inObj in data[key][keyinObj]) {
                                    header.push(<th><u>{inObj}</u>&nbsp;</th>);
                                }
                            } else {
                                header.push(<th>{keyinObj}&nbsp;</th>);
                            }
                        }
                    }
                }
            }
        }
        return header;
    };

    getBodyTable = (data) => {
        let body = [];
        // eslint-disable-next-line
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let num = Number(key);
                let obj = [];
                let dataByRow = [];
                dataByRow.push(num + 1);
                obj.push(<td>{num + 1}</td>);
                // eslint-disable-next-line
                for (let keyinObj in data[key]) {
                    if (data[key].hasOwnProperty(keyinObj)) {
                        if (typeof data[key][keyinObj] === "object") {
                            // eslint-disable-next-line
                            for (let inObj in data[key][keyinObj]) {
                                obj.push(<td>{data[key][keyinObj][inObj]}&nbsp;</td>);
                                dataByRow.push(data[key][keyinObj][inObj]);
                            }
                        } else {
                            obj.push(<td>{data[key][keyinObj]}</td>);
                            dataByRow.push(data[key][keyinObj]);
                        }
                    }
                }
                body.push(<tr onClick={() => this.searchJobID(dataByRow)}>{obj}</tr>);
            }
        }
        return body;
    };

    searchJobID = (value) => {
        console.log(value);
        // fetch('/api/inquiryAccountingRecord/' + this.state.account_number + "/" + this.state.account_sequence + "/"
        //         + this.state.transaction_date + "/" + this.state.channel_post_date + "/" + this.state.job_id + "/" +
        //         this.state.service, {})
        //         .then(response => response.json())
        //         .then(data => {
        //             if (data.rs_body) {
        //                 return(
            // let data = {
            //     "rs_body": {
            //         "gl_entry_list": [
            //             {
            //                 "transaction_id": "TestFind",
            //                 "transaction_sequence": 1,
            //                 "transaction_datetime": "2019-11-01T10:59:01Z",
            //                 "transaction_date": "2019-11-01",
            //                 "channel_post_date": "2019-11-01",
            //                 "datetime_stamp": "2019-11-01T10:59:01Z",
            //                 "job_id": "001",
            //                 "account_branch": 1,
            //                 "service_branch": 1,
            //                 "cost_center": "5555555555",
            //                 "transaction_account_type": "ITC",
            //                 "dr_cr": "C",
            //                 "gl_account_number": 2000000001,
            //                 "before_prin_balance": 77662796314522418.32,
            //                 "transaction_amount": 77662796314522418.32,
            //                 "after_prin_balance": 77662796314522418.32,
            //                 "currency": "THB",
            //                 "base_amount": 77662796314522418.32,
            //                 "base_currency": "THB",
            //                 "accounting_type": "ACCPEN",
            //                 "business_product": "00000002",
            //                 "business_area": "5555555555",
            //                 "profit_center": "0000006060",
            //                 "service": "test",
            //                 "other_properties": {
            //                     "interest_index": "test1",
            //                     "interest_spread": 2,
            //                     "first_payment_date": "test2",
            //                 },
            //                 "chrono_sequence": "1234567890"
            //             }
            //         ]
            //     }
            // };
            //                 utility.clearSessionStorage("response_inquiryAccountingByRow");
            //                 sessionStorage.setItem("response_inquiryAccountingByRow", JSON.stringify(data.rs_body.gl_entry_list));
            //                 window.open('/iabjSummary');
        //                 );
        //             } else {
        //                 alert("error code : " + data.errors.map(error => error.error_code) + "\n"
        //                     + "error desc : " + data.errors.map(error => error.error_desc) + "\n"
        //                     + "error type : " + data.errors.map(error => error.error_type));
        //             }
        //         }).catch(error => console.log(error))
    };

    render() {
        const data = JSON.parse(sessionStorage.getItem("response_inquiryAccountingRecord"));
        //console.log(data);
        return (
                <div className="App">
                    <DynamicHeader />
                    <Form>
                        <h2>Form Data Inquiry Accounting Record</h2>
                        <Col md={{ size: 10, offset: 1 }}>
                            <div class="table-responsive">
                                <Table hover>
                                    <thead>
                                        <tr>
                                            {this.getHeaderTable(data)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getBodyTable(data)}
                                    </tbody>
                                </Table>
                                <div>
                            </div>
                        </div>
                    </Col>
                </Form>
            </div>
         );
    }
}
export default inquiryAccountingRecordsSummery;