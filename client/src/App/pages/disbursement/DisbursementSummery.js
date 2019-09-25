import React, {Component} from 'react';
import {Button, Col, Table} from 'reactstrap';
import DynamicHeader from '../Header.js';

class disbursementSummery extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    //p-rest
    openInqPositionDetail() {
        const account = JSON.parse(sessionStorage.getItem("account_number"));
        //console.log(account.account_number);
        fetch('/api/inqPositionDetail/' + account).then(response => response.json())
            .then(data => {
                //console.log(data);
                if (data) {
                    const maximum = Math.max(...data.map(item => item.posnNbr));
                    //console.log(maximum);
                    const getdata = data.find(element => element.posnNbr === maximum);
                    let body = {
                        account_sequence: getdata.posnNbr,
                        open_date: getdata.openDate,
                        principal_balance: getdata.bal
                    };
                    sessionStorage.setItem("response_inqPositionDetail", JSON.stringify(body));
                    window.open('/ipdprestSummary', '_self');
                } else {
                    alert("Data not found.");
                }
            }).catch(error => console.log(error))
    };

    // openInqPositionDetail() {
    //     let account = JSON.parse(sessionStorage.getItem("data_inqLoanAccount"));
    //     console.log(account.account_number);
    //     fetch('/api/inquiryPositionDetail/' + account.account_number).then(response => response.json())
    //         .then(data => {
    //console.log(data);
    // if (data) {
    //     const maximum = Math.max(...data.map(item => item.posnNbr));
    //     //console.log(maximum);
    //     const getdata = data.find(element => element.posnNbr === maximum);
    //     let body = {
    //         account_sequence: getdata.posnNbr,
    //         open_date: getdata.openDate,
    //         principal_balance: getdata.bal
    //     };
    //     sessionStorage.setItem("data_inqPositionDetail", JSON.stringify(body));
    //     window.open('/ipdSummary', '_self');
    // } else {
    //     alert("Data not found.");
    // }
    // }).catch(error => console.log(error))
    //};

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
        const account = JSON.parse(sessionStorage.getItem("account_number"));
        const data = JSON.parse(sessionStorage.getItem("response_disbursement"));
        return (
            <div className="App">
                <DynamicHeader/>
                <h2>Form Data Disbursement</h2>
                <br/>
                <Col md={{size: 4, offset: 4}}>
                    {/* <Alert color="success"><h3>Success!!</h3></Alert> */}
                    {this.dynamicResponse(data.rs_body)}
                </Col>
                <br/>
                <Button color="success" onClick={this.openInqPositionDetail}>Inquiry Position Detail pREST
                    : {account.account_number}</Button>
            </div>
        );
    };
}

export default disbursementSummery;
