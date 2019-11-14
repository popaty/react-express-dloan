import React, { Component } from 'react';
import { Col, Form, Table } from 'reactstrap';
import DynamicHeader from '../Header.js';
import fieldHeader from './fieldRes.js'

class inquiryAccountingByJobIDSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        // eslint-disable-next-line
        for (let index in data) {
            let num = Number(index) + 1;
            let obj = [];
            obj.push(<td>{num}</td>);
            let value = this.getFieldHeader();
            if (data.hasOwnProperty(index)) {
                // eslint-disable-next-line
                for (let ResHeader in data[index]) {
                    // eslint-disable-next-line
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


    render() {
        const data = JSON.parse(sessionStorage.getItem("response_inquiryAccountingByRow"));
        //console.log(data);
        return (
            <div className="App">
                <DynamicHeader />
                <Form>
                    <h2>Form Data Inquiry Accounting Record By JobID</h2>
                    <Col md={{ size: 10, offset: 1 }}>
                        <div class="table-responsive">
                            <Table striped>
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
            </div>
        );
    }
}
export default inquiryAccountingByJobIDSummery;

