import React, { Component } from 'react';
import { Button, Col, Table } from 'reactstrap';
import DynamicHeader from '../Header.js';

class inquiryPositionPRESTSummery extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    CallInquiryLoanAccount() {
        const data = JSON.parse(sessionStorage.getItem("data_inqLoanAccount"));
        //console.log(data.account_number);
        fetch('/api/inqLoanAccount/' + data.account_number, {}).then(response => response.json())
            .then(data => {
                //console.log(data);
                if (data.rs_body) {
                    sessionStorage.setItem("data_inqLoanAccount", JSON.stringify(data.rs_body));
                    window.open('/ilaSummary', '_self');
                } else {
                    alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                        + "error desc : " + data.errors.map(error => error.error_desc));
                }

            }).catch(error => console.log(error))
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
        const data = JSON.parse(sessionStorage.getItem("data_inqPositionDetail"));
        //console.log(data);
        return (
            <div className="App">
                <DynamicHeader />
                <form>
                    <br />
                    <h2>Form Data Inquiry Position Detail</h2>
                    <br />
                    <Col md={{ size: 6, offset: 3 }}>
                        {this.dynamicResponse(data)}
                    </Col>
                    <br />
                    {/* <Button color="success" onClick={this.Clicked}>Inquiry Interest Accrued</Button><br /><br /> */}
                    <Button color="success" onClick={this.CallInquiryLoanAccount}>Inquiry Account Details </Button>
                </form>
            </div>
        );
    }
}

export default inquiryPositionPRESTSummery;
