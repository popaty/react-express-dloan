import React, { Component } from 'react';
import { Button, Col, Table } from 'reactstrap';
import DynamicHeader from '../Header.js';

class InquiryLoanAccountSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        InquiryLoanAccountSummery.openInstallment = InquiryLoanAccountSummery.openInstallment.bind(this);
    };

    static getSessionStorage() {
        return JSON.parse(sessionStorage.getItem("response_inqLoanAccount"));
    };

    static openInstallment() {
        const data = InquiryLoanAccountSummery.getSessionStorage();
        const body = {
            interest_rate: data.interest.interest_rate,
            payment_frequency: data.payment.payment_frequency,
            payment_unit: data.payment.payment_unit
        };
        sessionStorage.setItem("request_installment", JSON.stringify(body));
        window.open('/ciaComponent', '_self');
    };

    dynamicResponse = (data) => {
        let table = [];
        let children = [];
        let orange = "#E4640B";
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
                                // if (subdata === "is_freeze") {
                                //     obj.push(<tr style={{ color: purple }}>
                                //         <td>{subdata}</td>
                                //         <td>{catchup}</td>
                                //     </tr>)
                                // } else {
                                    obj.push(<tr>
                                        <td>{subdata}</td>
                                        <td>{catchup}</td>
                                    </tr>)
                                // }
                            } else {
                                if (subdata === "balance" || subdata === "available_balance") {
                                    obj.push(<tr class="text-primary">
                                        <td>{subdata}</td>
                                        <td>{data[key][subdata]}</td>
                                    </tr>);
                                } else {
                                    // if ((subdata === "oldest_stmt_due_date" )|| (subdata === "total_unpaid_penalty_amount" )||
                                    // (subdata === "total_unpaid_interest_amount") || (subdata === "total_unpaid_principal_amount")
                                    // ||(subdata === "total_bill_unpaid_amount")) {
                                    //     if(key === "bills"){
                                    //         obj.push(<tr style={{ color: purple }}>
                                    //             <td>{subdata}</td>
                                    //             <td>{data[key][subdata]}</td>
                                    //         </tr>);
                                    //     }else{
                                    //         obj.push(<tr>
                                    //             <td>{subdata}</td>
                                    //             <td>{data[key][subdata]}</td>
                                    //         </tr>);
                                    //     }
                                    // } else {
                                        obj.push(<tr>
                                            <td>{subdata}</td>
                                            <td>{data[key][subdata]}</td>
                                        </tr>);
                                    // }
                                }
                            }
                        }
                    }
                    children.push(<tr>
                        <td>{key + " : "}</td>
                        <td><Table borderless>{obj}</Table></td>
                    </tr>);
                } else {
                    if(key === "account_name_en"){
                        children.push(<tr style={{ color: '#E4640B' }}>
                            <td>{key}</td>
                            <td>{data[key]}</td>
                        </tr>);
                    }else{
                        children.push(<tr>
                            <td>{key}</td>
                            <td>{data[key]}</td>
                        </tr>);
                    }
                    
                }
            }
        }
        table.push(<Table bordered>{children}</Table>);
        return table;
    };

    render() {
        const data = InquiryLoanAccountSummery.getSessionStorage();
        sessionStorage.setItem("account_number", JSON.stringify(data.account_number));
        //console.log(data);
        return (
            <div className="App">
                <DynamicHeader />
                <h2>Form Data Inquiry Account</h2>
                <Col md={{ size: 6, offset: 3 }}>
                    {this.dynamicResponse(data)}
                </Col>
                <Button color="success" onClick={InquiryLoanAccountSummery.openInstallment}>Calculate Installment
                    Amount</Button>
            </div>
        )
    };
}

export default InquiryLoanAccountSummery;
