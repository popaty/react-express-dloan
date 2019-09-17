import React, {Component} from 'react';
import {Button, Alert, Col, Row} from 'reactstrap';
import DynamicHeader from '../Header.js';

class disbursementSummery extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    openInqPositionDetail() {
        var account = JSON.parse(sessionStorage.getItem("data_inqLoanAccount"));
        //console.log(account.account_number);
        fetch('/api/inqPositionDetail/' + account.account_number).then(response => response.json())
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
                    sessionStorage.setItem("data_inqPositionDetail", JSON.stringify(body));
                    window.open('/ipdSummary', '_self');
                } else {
                    alert("Data not found.");
                }
            }).catch(error => console.log(error))
    };

    render() {
        var data = JSON.parse(sessionStorage.getItem("data_inqLoanAccount"));
        return (
            <div className="App">
                <DynamicHeader/>
                <br/>
                <Row>
                    <Col md={{size: 4, offset: 4}}>
                        <Alert color="success"><h3>Success!!</h3>
                        </Alert>
                    </Col>
                </Row>
                <br/>
                <Button color="success" onClick={this.openInqPositionDetail}>Inquiry Position Detail
                    : {data.account_number}</Button>
            </div>
        );
    };
}

export default disbursementSummery;
