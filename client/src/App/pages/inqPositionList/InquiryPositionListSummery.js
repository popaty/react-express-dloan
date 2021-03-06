import React, {Component} from 'react';
import {Col, Form, Table} from 'reactstrap';
import DynamicHeader from '../Header.js';
import fieldHeader from './fieldRes.js'

class inquiryPositionSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // getHeaderTable = (data) => {
    //     let header = [];
    //     if (data.length > 1) {
    //         header.push(<th>#&nbsp;</th>);
    //         // eslint-disable-next-line
    //         for (let key in data[0]) {
    //             if (data[0].hasOwnProperty(key)) {
    //                 header.push(<th>{key}&nbsp;</th>);
    //             }
    //         }
    //     } else {
    //         // eslint-disable-next-line
    //         for (let key in data) {
    //             if (data.hasOwnProperty(key)) {
    //                 header.push(<th>#&nbsp;</th>);
    //                 // eslint-disable-next-line
    //                 for (let keyinObj in data[key]) {
    //                     if (data[key].hasOwnProperty(keyinObj)) {
    //                         header.push(<th>{keyinObj}&nbsp;</th>);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return header;
    // };

    // getBodyTable = (data) => {
    //     let body = [];
    //     // eslint-disable-next-line
    //     for (let key in data) {
    //         if (data.hasOwnProperty(key)) {
    //             let num = Number(key);
    //             let obj = [];
    //             obj.push(<td>{num + 1}</td>);
    //             // eslint-disable-next-line
    //             for (let keyinObj in data[key]) {
    //                 if (data[key].hasOwnProperty(keyinObj)) {
    //                     if (typeof data[key][keyinObj] === "boolean") {
    //                         let catchup = String(data[key][keyinObj]);
    //                         obj.push(<td>{catchup}</td>)
    //                     } else {
    //                         obj.push(<td>{data[key][keyinObj]}</td>);
    //                     }
    //                 }
    //             }
    //             body.push(<tr>{obj}</tr>);
    //         }
    //     }
    //     return body;
    // };

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
                        }else{
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

    render() {
        const data = JSON.parse(sessionStorage.getItem("response_inqPositionList"));
        //console.log(data);
        return (
            <div className="App">
                <DynamicHeader/>
                <Form>
                    <h2>Form Data Inquiry Position List</h2>
                    <Col md={{size: 10, offset: 1}}>
                        <div class="table-responsive">
                            <Table striped bordered>
                                <thead>
                                <tr>
                                    {this.getHeaderTable()}
                                </tr>
                                </thead>
                                <tbody>
                                {this.getBodyTable(data)}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Form>
            </div>
        );
    }
}

export default inquiryPositionSummery;
