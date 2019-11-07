import React, { Component } from 'react';
import { Col, Form, Table } from 'reactstrap';
import DynamicHeader from '../Header.js';
import fieldHeader from './fieldRes.js'

class inquiryAccountingByJobIDSummery extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        }
        
        getHeaderTable = () => {
            let header = [];
            header.push(<th>#&nbsp;</th>);
            fieldHeader.gl_entry_list.map(item => {
                if (item === "trnRef" || item === "before_balance" || item === "first_payment_date"
                    || item === "installment_amount" || item === "number_of_payment") {
                    header.push(<th><u>{item}</u>&nbsp;</th>);
                } else {
                    header.push(<th>{item}&nbsp;</th>);
                }
            })
            return header;
        };
        
        getBodyTable = (data) => {
            let body = [];
            for (let index in data) { 
                let num = Number(index)+ 1;
                let obj = [];
                obj.push(<td>{num}</td>); 
                let tmp = this.checkFieldHeader();
                // if (data.hasOwnProperty(index)) {
                // eslint-disable-next-line
                     for (let ResHeader in data[index]) {
                        if (typeof data[index][ResHeader] === "object") {
                            for(let inObj in data[index][ResHeader]){
                                for(let keyInObj in  data[index][ResHeader][inObj]){
                                    tmp[keyInObj] = data[index][ResHeader][inObj][keyInObj];
                                }
                            }
                         } else {
                            tmp[ResHeader] = data[index][ResHeader];
                        }
                     }
                    for(let indexValue in tmp){
                         obj.push(<td>{tmp[indexValue]}</td>);
                    }  
                    body.push(<tr>{obj}</tr>);
            }
            return body;
        };
    
        checkFieldHeader = () => {
            let key = new Object();
            fieldHeader.gl_entry_list.map(item => {  
                    key[item] = "";
            })
            return key; 
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
                                                {this.getHeaderTable()}
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
    
