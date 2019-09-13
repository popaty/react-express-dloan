import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';
import DynamicHeader from '../Header.js';

class inquiryPositionSummery extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    getHeaderTable = (data) => {
        let header = [];
        for (let key in data) {
            header.push(<th>#&nbsp;</th>);
            for (let keyinObj in data[key]) {
                header.push(<th>{keyinObj}&nbsp;</th>);
            }
            break;
        }
        return header;
    }
    getBodyTable = (data) => {
        let body = [];
        for (let key in data) {
            var num = Number(key);
            let obj = [];
            obj.push(<td>{num+1}</td>);
            for (let keyinObj in data[key]) {
                if (typeof data[key][keyinObj] === "boolean") {
                    var catchup = String(data[key][keyinObj]);
                    obj.push(<td>{catchup}</td>)
                } else {
                    obj.push(<td>{data[key][keyinObj]}</td>);
                }
            }
            body.push(<tr>{obj}</tr>);
        }
        return body;
    }

    render() {
        var data = JSON.parse(sessionStorage.getItem("data_inqInterastaAccrued"));
        console.log(data);
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
                                            {this.getHeaderTable(data.position_detail)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getBodyTable(data.position_detail)}
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
