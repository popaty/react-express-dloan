import React, { Component } from 'react';
import { Button, Table, Col } from 'reactstrap';
import DynamicHeader from '../Header.js';

class InquiryLoanAccountSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        InquiryLoanAccountSummery.opentInstallment = InquiryLoanAccountSummery.opentInstallment.bind(this);
    };

    static getSessionStorage() {
        return JSON.parse(sessionStorage.getItem("data_inqLoanAccount"));
    };

    static opentInstallment() {
        const data = InquiryLoanAccountSummery.getSessionStorage();
        const body = {
            interest_rate: data.interest.interest_rate,
            payment_frequency: data.payment.payment_frequency,
            payment_unit: data.payment.payment_unit
        };
        sessionStorage.setItem("inputData_installment", JSON.stringify(body));
        window.open('/ciaComponent', '_self');
    };

    dynamicResponse = (data) => {
        let table = [];
        let children = [];
        // eslint-disable-next-line
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                if (typeof data[key] === "object") {
                    let obj = [];
                    // eslint-disable-next-line
                    for (let subdata in data[key]) {
                        if (data[key].hasOwnProperty(subdata)) {
                            if (typeof data[key][subdata] === "boolean") {
                                let catchup = String(data[key][subdata]);
                                obj.push(<tr><td>{subdata}</td><td>{catchup}</td></tr>)
                            } else {
                                if (subdata === "balance" || subdata === "available_balance") {
                                    obj.push(<tr class="text-primary"><td>{subdata}</td><td>{data[key][subdata]}</td></tr>);
                                } else {
                                    obj.push(<tr ><td>{subdata}</td><td>{data[key][subdata]}</td></tr>);
                                }
                            }
                        }
                    }
                    children.push(<tr><td>{key + " : "}</td><td><Table borderless>{obj}</Table></td></tr>);
                } else {
                    children.push(<tr><td>{key}</td><td>{data[key]}</td></tr>);
                }
            }
        }
        table.push(<Table bordered>{children}</Table>);
        return table;
    };

    render() {
        const data = InquiryLoanAccountSummery.getSessionStorage();
        //console.log(data);
        return (
            <div className="App">
                <DynamicHeader />
                <h2>Form Data Inquiry Account</h2>
                <br />
                <Col md={{ size: 6, offset: 3 }} >
                    {this.dynamicResponse(data)}
                </Col>
                <br />
                <Button color="success" onClick={InquiryLoanAccountSummery.opentInstallment}>Calculate Installment Amount</Button>
                <br />
                <br />
                <br />
            </div>
        )
    };
}

export default InquiryLoanAccountSummery;
