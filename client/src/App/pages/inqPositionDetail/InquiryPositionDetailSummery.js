import React, {Component} from 'react';
import {Col, Table} from 'reactstrap';
import DynamicHeader from '../Header.js';

class InquiryPositionDetailSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                                obj.push(<tr>
                                    <td>{subdata}</td>
                                    <td>{catchup}</td>
                                </tr>)
                            } else {
                                if (subdata === "available_balance" ||
                                subdata === "unpaid_accrued_interest_amount" || subdata === "interest_rate") {
                                    obj.push(<tr class="text-primary">
                                        <td>{subdata}</td>
                                        <td>{data[key][subdata]}</td>
                                    </tr>);
                                } else if (subdata === "balance" || subdata === "unpaid_principal_amount"){
                                    if(key === "bills"){
                                        obj.push(<tr>
                                            <td>{subdata}</td>
                                            <td>{data[key][subdata]}</td>
                                        </tr>);
                                    }else{
                                        obj.push(<tr class="text-success">
                                        <td>{subdata}</td>
                                        <td>{data[key][subdata]}</td>
                                        </tr>);
                                    }
                                } else {
                                    obj.push(<tr>
                                        <td>{subdata}</td>
                                        <td>{data[key][subdata]}</td>
                                    </tr>);
                                }
                            }
                        }
                    }
                    children.push(<tr>
                        <td>{key + " : "}</td>
                        <td><Table borderless>{obj}</Table></td>
                    </tr>);
                } else {
                    children.push(<tr>
                        <td>{key}</td>
                        <td>{data[key]}</td>
                    </tr>);
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
                <DynamicHeader/>
                <h2>Form Data Inquiry Position Detail</h2>
                <Col md={{size: 6, offset: 3}}>
                    {this.dynamicResponse(data)}
                </Col>
                <br />
            </div>
        )
    };
}

export default InquiryPositionDetailSummery;
