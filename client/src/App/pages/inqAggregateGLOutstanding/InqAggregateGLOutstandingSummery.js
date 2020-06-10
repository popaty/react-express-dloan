import React, { Component } from 'react';
import { Col, Table } from 'reactstrap';
import DynamicHeader from '../Header.js';
import fieldHeader from './fieldRes.js'

class InqAggregateGLOutstandingSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    static getSessionStorage() {
        return JSON.parse(sessionStorage.getItem("response_inqAggregateGLOutstanding"));
    };

    getHeaderTable = () => {
        let header = [];
        header.push(<th>#&nbsp;</th>);
        fieldHeader.rsBody.map(item => {
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
            // console.log(value);
            if (data.hasOwnProperty(index)) {
                // eslint-disable-next-line
                for (let key in data[index]) {
                    if (typeof data[index][key] === "object") {
                    //     // eslint-disable-next-line
                        for (let inObj in data[index][key]) {
                            // eslint-disable-next-line
                            for (let keyInObj in data[index][key][inObj]) {
                                value[keyInObj] = data[index][key][inObj][keyInObj];
                            }
                        }
                    } else {
                        if (typeof data[index][key] === "boolean") {
                            let catchup = String(data[index][key]);
                            value[key] = catchup;
                        }else{
                            value[key] = data[index][key];
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
        fieldHeader.rsBody.map(item => {
            key[item] = "";
        })
        return key;
    };

    render() {
        const data = InqAggregateGLOutstandingSummery.getSessionStorage();
        return (
            <div className="App">
                <DynamicHeader />
                <h2>Form Data Inquiry Aggregate GL Outstanding</h2>
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
            </div>
        )
    };
}

export default InqAggregateGLOutstandingSummery;
