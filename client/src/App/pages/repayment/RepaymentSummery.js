import React, { Component } from 'react';
import { Button, Table, Col } from 'reactstrap';
import DynamicHeader from '../Header.js';


class RepaymentSummery extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    dynamicResponse = (data) => {
        let table = [];
        let children = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                if (typeof data[key] === "object") {
                    let obj = [];
                    for (let subdata in data[key]) {
                        if (data[key].hasOwnProperty(subdata)) {
                            if (typeof data[key][subdata] === "boolean") {
                                let catchup = String(data[key][subdata]);
                                obj.push(<tr><td>{subdata}</td><td>{catchup}</td></tr>)
                            } else {
                                obj.push(<tr><td>{subdata}</td><td>{data[key][subdata]}</td></tr>);
                            }
                        }
                    }
                    children.push(<tr><td>{key + " : "}</td><td><Table>{obj}</Table></td></tr>);
                } else {
                    children.push(<tr><td>{key}</td><td>{data[key]}</td></tr>);
                }
            }
        }
        table.push(<Table bordered >{children}</Table>);
        return table;
    };

    render() {
        const data = JSON.parse(sessionStorage.getItem("data_repayment"));
        //console.log(data);
        return (
            <div className="App">
                <DynamicHeader />
                <form>
                    <br />
                    <h2 >Form Data Repayment</h2>
                    <br />
                    <Col md={{ size: 6, offset: 3 }} >
                        {this.dynamicResponse(data.rs_body)}
                    </Col>
                    <br />
                    <Button color="success" onClick={calculateInstallmentSummary.openDisbursement}>Disbursement</Button><br />
                </form>
            </div>
        );
    }
}
export default RepaymentSummery;
