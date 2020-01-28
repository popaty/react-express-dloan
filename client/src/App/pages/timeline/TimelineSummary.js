import React, {Component} from 'react';
import {Col, Form, Table} from 'reactstrap';
import DynamicHeader from '../Header.js';
import fieldHeader from './fieldRes.js'

class TimelineSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getHeaderTable = () => {
        let header = [];
        header.push(<th>#&nbsp;</th>);
        fieldHeader.timeline_list.map(item => {
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
        fieldHeader.timeline_list.map(item => {
            key[item] = "";
        })
        return key;
    };

    render() {
        const data = JSON.parse(sessionStorage.getItem("response_inqTimeline"));
        //console.log(data);
        return (
            <div className="App">
                <DynamicHeader/>
                <Form>
                    <h2>Timeline Item List result</h2>
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

export default TimelineSummary;
