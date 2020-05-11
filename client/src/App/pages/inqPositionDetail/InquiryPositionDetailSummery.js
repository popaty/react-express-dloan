import React, { Component } from 'react';
import { Col, Table } from 'reactstrap';
import DynamicHeader from '../Header.js';

class InquiryPositionDetailSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    dynamicResponse = (data) => {
        let table = [];
        let children = [];
        let orange = "#E4640B";
        let blue = "#0000FF";
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
                                obj.push(<tr>
                                    <td>{subdata}</td>
                                    <td>{catchup}</td>
                                </tr>)
                            } else {
                                if (subdata === "unpaid_principal_amount" || subdata === "total_bill_unpaid_amount" ||
                                    subdata === "unpaid_accrued_interest_amount" || subdata === "interest_rate" ||
                                    subdata === "number_of_payment") {
                                    obj.push(<tr style={{ color: blue }}>
                                        <td>{subdata}</td>
                                        <td>{data[key][subdata]}</td>
                                    </tr>);
                                } else {
                                    if (subdata === "balance" ){
                                        obj.push(<tr class="text-success">
                                            <td>{subdata}</td>
                                            <td>{data[key][subdata]}</td>
                                        </tr>);
                                    } else {
                                        if (subdata === "installment_amount") {
                                            obj.push(<tr style={{ color: orange }}>
                                                <td>{subdata}</td>
                                                <td>{data[key][subdata]}</td>
                                            </tr>);
                                        } else {
                                            obj.push(<tr>
                                                <td>{subdata}</td>
                                                <td>{data[key][subdata]}</td>
                                            </tr>);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    children.push(<tr>
                        <td>{key + " : "}</td>
                        <td><Table borderless>{obj}</Table></td>
                    </tr>);
                } else {
                    if (typeof data[key] === "boolean") {
                        let catchup = String(data[key]);
                        // if (key === "is_closed") {
                        //     children.push(<tr style={{ color: purple }}>
                        //         <td>{key}</td>
                        //         <td>{catchup}</td>
                        //     </tr>)
                        // } else {
                            children.push(<tr>
                                <td>{key}</td>
                                <td>{catchup}</td>
                            </tr>)
                        // }
                    } else {
                        if (key === "product_name") {
                            children.push(<tr style={{ color: orange }}>
                                <td>{key}</td>
                                <td>{data[key]}</td>
                            </tr>);
                        } else {
                            children.push(<tr>
                                <td>{key}</td>
                                <td>{data[key]}</td>
                            </tr>);
                        }
                    }
                }
            }
        }
        table.push(<Table bordered>{children}</Table>);
        return table;
    };

    render() {
        const data = JSON.parse(sessionStorage.getItem("response_inqPositionDetail"));
        //console.log(data);
        return (
            <div className="App">
                <DynamicHeader />
                <h2>Form Data Inquiry Position Detail</h2>
                <Col md={{ size: 6, offset: 3 }}>
                    {this.dynamicResponse(data)}
                </Col>
                <br />
            </div>
        )
    };
}

export default InquiryPositionDetailSummery;
