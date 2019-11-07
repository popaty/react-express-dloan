import React, { Component } from 'react';
import { Col, Form, Table } from 'reactstrap';
import DynamicHeader from '../Header.js';
// import utility from '../Utility.js';
import Modal from '../modal'
import fieldHeader from './fieldRes.js';

class inquiryAccountingRecordsSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        };
        this.searchJobID = this.searchJobID.bind(this);
    }

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

    getBodyTable = (data) => {
        let body = [];
        for (let index in data) {                         // length index in json response 
            let obj = [];
            let num = Number(index) + 1;
            obj.push(<td>{num}</td>);

            // if (data.hasOwnProperty(index)) {
            // eslint-disable-next-line
                 for (let ResHeader in data[index]) {
                    if (typeof data[index][ResHeader] === "object") {
                        for(let inObj in data[index][ResHeader]){
                            for(let keyInObj in  data[index][ResHeader][inObj]){
                                // if(item === keyInObj){
                                //         obj.push(<td>{data[index][ResHeader][inObj][keyInObj]}</td>);
                                //         break;
                                //     }
                                // this.checkFieldHeader(keyInObj);
                                // console.log("obj ="+this.checkFieldHeader(keyInObj));
                                this.checkFieldHeader(keyInObj);
                            }
                        }
                     } else {
                        //  console.log("not = "+ResHeader);
                        // if(ResHeader === item){
                        //     obj.push(<td>{data[index][ResHeader]}</td>);
                        //     break;
                        // }
                         
                        //   console.log(this.checkFieldHeader(ResHeader));
                        this.checkFieldHeader(ResHeader);


                    }
                 }
            // body.push(<tr>{obj}</tr>);
        }
        return body;
    };

    checkFieldHeader = (field) => {
        // console.log(field);
        let key = []
        fieldHeader.gl_entry_list.map(item => {  
            // if(item.hasOwnProperty(field)){
            //     console.log("then ="+item);
            // }else{
            //     console.log("else="+item);
            // }
            // if(field === item){
            //      key.push(field);
            // }
        })
         return key;
    };

    showModal = e => {
        this.setState({ status: !this.state.status });
    }

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
                                        {this.getHeaderTable()}
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
                <Modal show={this.state.status} onClose={this.showModal} />
            </div>
        );
    }
}
export default inquiryAccountingRecordsSummery;