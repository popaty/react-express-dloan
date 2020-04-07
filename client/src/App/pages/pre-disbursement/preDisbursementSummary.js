import React, {Component} from 'react';
import {Col, Table} from 'reactstrap';
import DynamicHeader from '../Header.js';

class PreDisbursementSummary extends Component {


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
                                obj.push(<tr>
                                    <td>{subdata}</td>
                                    <td>{data[key][subdata]}</td>
                                </tr>);
                            }
                        }
                    }
                    children.push(<tr>
                        <td>{key + " : "}</td>
                        <td><Table>{obj}</Table></td>
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
        const data = JSON.parse(sessionStorage.getItem("response_preDisbursement"));
        return (
            <div className="App">
                <DynamicHeader/>
                <h2>Form Data Pre-Disbursement</h2>
                <Col md={{size: 6, offset: 3}}>
                    {this.dynamicResponse(data.rs_body)}
                </Col>
            </div>
        );
    };
}

export default PreDisbursementSummary;