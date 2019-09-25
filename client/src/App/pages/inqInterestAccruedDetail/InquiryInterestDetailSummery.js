import React, {Component} from 'react';
import {Col, Form, Table} from 'reactstrap';
import DynamicHeader from '../Header.js';

class inquiryPositionSummery extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

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
        const data = JSON.parse(sessionStorage.getItem("response_inqInterestAccruedDetail"));
        //var data2 = JSON.parse(sessionStorage.getItem("data_inqPositionDetail"));
        return (
            <div className="App">
                <DynamicHeader/>
                <Form>
                    <h2>Form Data Inquiry Interest Accrued Details</h2>
                    <br/>
                    <Col md={{size: 6, offset: 3}}>
                        {this.dynamicResponse(data.rs_body)}
                    </Col>
                    {/* <Col md={{ size: 5 }} >
                    {this.dynamicResponse(data2)}
                </Col> */}
                    <br/>
                </Form>
            </div>
        );
    }
}

export default inquiryPositionSummery;
