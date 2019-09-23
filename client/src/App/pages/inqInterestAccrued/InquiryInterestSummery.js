import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';
import DynamicHeader from '../Header.js';

class inquiryPositionSummery extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    };

    getHeaderTable = (data) => {
        let header = [];
        if (data.length > 1) {
            header.push(<th>#&nbsp;</th>);
            // eslint-disable-next-line
            for (let key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                    header.push(<th>{key}&nbsp;</th>);
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
                            // if(keyinObj !== "daily_accrued_amount" && keyinObj !== "unpaid_accrued_amount"){
                            header.push(<th>{keyinObj}&nbsp;</th>);
                            // }
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
                        if (typeof data[key][keyinObj] === "boolean") {
                            let catchup = String(data[key][keyinObj]);
                            obj.push(<td>{catchup}</td>)
                        } else {
                            // if(keyinObj !== "daily_accrued_amount" && keyinObj !== "unpaid_accrued_amount"){
                            obj.push(<td>{data[key][keyinObj]}</td>);
                            // }
                        }
                    }
                }
                body.push(<tr>{obj}</tr>);
            }
        }
        return body;
    };

    render() {
        const data = JSON.parse(sessionStorage.getItem("data_inqInterastaAccrued"));
        // console.log(data);
        return (
            <div className="App" >
                <DynamicHeader />
                <form>
                    <br />
                    <h2 >Form Data Inquiry Position Detail</h2>
                    <br />
                    <Row>
                        <Col md={{ size: 8, offset: 2 }} >
                            <div class="table-responsive">
                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                            {this.getHeaderTable(data)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getBodyTable(data)}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                    <br />
                    {/* <Button color="success" onClick={this.Clicked}>Inquiry Interest Accrued</Button><br /><br /> */}
                    {/* <Button color="success" onClick={this.CallInquiryLoanAccount} >Inquiry Account Details </Button> */}
                </form>
            </div>
        );
    }
}

export default inquiryPositionSummery;
