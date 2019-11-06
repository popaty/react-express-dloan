import React, { Component } from 'react';
import { Col, Form, Table } from 'reactstrap';
import DynamicHeader from '../Header.js';


class inquiryAccountingByJobIDSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
        getHeaderTable = (data) => {
            let header = [];
            if (data.length > 1) {
                header.push(<th>#&nbsp;</th>);
                // eslint-disable-next-line
                for (let key in data[0]) {
                    if (data[0].hasOwnProperty(key)) {
                        if (typeof data[0][key] === "object") {
                            // eslint-disable-next-line
                            for (let inObj in data[0][key]) {
                                header.push(<th><u>{inObj}</u>&nbsp;</th>);
                            }
                        } else {
                            header.push(<th>{key}&nbsp;</th>);
                        }
                    }
                }
            } else {
                // eslint-disable-next-line
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        header.push(<th>#&nbsp;</th>);
                        // eslint-disable-next-line
                        for (let keyinObj in data[key]) {
                            if (data[key].hasOwnProperty(keyinObj)) {
                                if (typeof data[key][keyinObj] === "object") {
                                    // eslint-disable-next-line
                                    for (let inObj in data[key][keyinObj]) {
                                        header.push(<th><u>{inObj}</u>&nbsp;</th>);
                                    }
                                } else {
                                    header.push(<th>{keyinObj}&nbsp;</th>);
                                }
                            }
                        }
                    }
                }
            }
            return header;
        };
    
        getBodyTable = (data) => {
            let body = [];
            // eslint-disable-next-line
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    let num = Number(key);
                    let obj = [];
                    obj.push(<td>{num + 1}</td>);
                    // eslint-disable-next-line
                    for (let keyinObj in data[key]) {
                        if (data[key].hasOwnProperty(keyinObj)) {
                            if (typeof data[key][keyinObj] === "object") {
                                // eslint-disable-next-line
                                for (let inObj in data[key][keyinObj]) {
                                    obj.push(<td>{data[key][keyinObj][inObj]}&nbsp;</td>);
                                }
                            } else {
                                obj.push(<td>{data[key][keyinObj]}</td>);
                            }
                        }
                    }
                    body.push(<tr>{obj}</tr>);
                }
            }
            return body;
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
                                                {this.getHeaderTable(data)}
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
    
