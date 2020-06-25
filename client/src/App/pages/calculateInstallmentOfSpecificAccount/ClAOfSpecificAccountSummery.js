import React, { Component } from 'react';
import { Col, Form, Table, Row } from 'reactstrap';
import DynamicHeader from '../Header.js';
import fieldHeader from './FieldHeader.js'

class ClAOfSpecificAccountSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    getHeaderTable = () => {
        let header = [];
        header.push(<th>#&nbsp;</th>);
        fieldHeader.position_detail.map(item => {
            header.push(<th>{item}&nbsp;</th>);
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
                    if (typeof data[index][ResHeader] === "object") {
                        // eslint-disable-next-line
                        for (let inObj in data[index][ResHeader]) {
                            // eslint-disable-next-line
                            for (let keyInObj in data[index][ResHeader][inObj]) {
                                value[keyInObj] = data[index][ResHeader][inObj][keyInObj];
                            }
                        }
                    } else {
                        if (typeof data[index][ResHeader] === "boolean") {
                            let catchup = String(data[index][ResHeader]);
                            value[ResHeader] = catchup;
                        } else {
                            value[ResHeader] = data[index][ResHeader];
                        }
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
        fieldHeader.position_detail.map(item => {
            key[item] = "";
        })
        return key;
    };

    dynamicResponse = (data) => {
        let table = [];
        let children = [];
        // eslint-disable-next-line
        for (let key in data) {
            if (key !== 'number_of_payment_lists') {
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
                            <td>{key + " : "}</td>
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
        const data = JSON.parse(sessionStorage.getItem("response_installmentOfSpecificAccount"));
        return (
            <div className="App">
                <DynamicHeader />
                <Form>
                    <h2>Form Data Calculate Installment Amount Options of Specific Account</h2>
                    <Row>
                        <Col md={{ size: 6, offset: 3 }}>
                            <div style={{textAlign : "left"}}>number_of_payment_lists :</div>
                            <div class="table-responsive">
                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                            {this.getHeaderTable()}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getBodyTable(data.rs_body.number_of_payment_lists)}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ size: 6, offset: 3 }}>
                            {this.dynamicResponse(data.rs_body)}
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default ClAOfSpecificAccountSummery;
