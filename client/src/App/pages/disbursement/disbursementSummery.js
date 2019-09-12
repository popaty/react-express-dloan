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
        console.log(account.account_number);
        fetch('/api/inqPositionDetail/' + account.account_number, {}).then(response => response.json())
            .then(data => {
                console.log(data);
                if (data) {
                    // var data =[
                    //         {
                    //             "_Id": "4Qs0W2o1rcBiWV---V5F-E7-",
                    //             "_attch": null,
                    //             "_cLogRef": "4Qs0W2o1rcBiWV----5F----",
                    //             "_flags": null,
                    //             "_schVn": 0,
                    //             "_uLog": null,
                    //             "_uLogRef": null,
                    //             "_vn": 0,
                    //             "acctGroup": 3,
                    //             "acctNbr": "600000000016",
                    //             "acctgSeg": {
                    //                 "deptId": "350",
                    //                 "vertical": "01"
                    //             },
                    //             "assetClass": null,
                    //             "assetId": null,
                    //             "bal": 0.00,
                    //             "branch": "21",
                    //             "ccyCode": "THB",
                    //             "closeDtm": null,
                    //             "closeReason": null,
                    //             "collectedBal": null,
                    //             "crLimit": 0.00,
                    //             "customerType": "0702",
                    //             "firstDisbmtDtm": null,
                    //             "glCat": 1,
                    //             "glSetCode": "loansGlSet",
                    //             "maturityDtm": null,
                    //             "nextPosnCalDtm": null,
                    //             "openDate": "2019-08-25",
                    //             "openDtm": "2019-08-25T07:03:07.84242+07:00",
                    //             "payoff": null,
                    //             "posnAcctNbr": "60000000001600",
                    //             "posnName": "7200120090001",
                    //             "posnNbr": 0,
                    //             "processFlags": null,
                    //             "prodName": "7200120090001",
                    //             "purpose": null,
                    //             "region": null,
                    //             "riskRating": null,
                    //             "subBals": {
                    //                 "dec2": {
                    //                     "lnFee": 0.00,
                    //                     "lateChrg": 0.00
                    //                 },
                    //                 "dec5": {
                    //                     "accrInt": 0.00000,
                    //                     "negAccr": 0.00000
                    //                 }
                    //             },
                    //             "tmZoneCode": "thbkk"
                    //         },
                    //         {
                    //             "_Id": "4Qs0_MRLV73WHV----5F-E7-",
                    //             "_attch": null,
                    //             "_cLogRef": "4Qs0_MRLRZN2bF----5F----",
                    //             "_flags": null,
                    //             "_schVn": 0,
                    //             "_uLog": "4Qs0_MRLV73WHV--0F5F-EB-",
                    //             "_uLogRef": "4Qs0_MRLRZN2bF----5F----",
                    //             "_vn": 1,
                    //             "acctGroup": 3,
                    //             "acctNbr": "600000000016",
                    //             "acctgSeg": {
                    //                 "deptId": "350",
                    //                 "vertical": "01"
                    //             },
                    //             "assetClass": null,
                    //             "assetId": null,
                    //             "bal": 100000.00,
                    //             "branch": "21",
                    //             "ccyCode": "THB",
                    //             "closeDtm": null,
                    //             "closeReason": null,
                    //             "collectedBal": null,
                    //             "crLimit": 0.00,
                    //             "customerType": "0702",
                    //             "firstDisbmtDtm": null,
                    //             "glCat": 1,
                    //             "glSetCode": null,
                    //             "maturityDtm": null,
                    //             "nextPosnCalDtm": null,
                    //             "openDate": "2019-08-25",
                    //             "openDtm": "2019-08-25T07:04:21.831229+07:00",
                    //             "payoff": null,
                    //             "posnAcctNbr": "60000000001601",
                    //             "posnName": null,
                    //             "posnNbr": 1,
                    //             "processFlags": null,
                    //             "prodName": "7200120090001",
                    //             "purpose": null,
                    //             "region": null,
                    //             "riskRating": null,
                    //             "subBals": {
                    //                 "dec2": {
                    //                     "lnFee": 0.00,
                    //                     "lateChrg": 0.00
                    //                 },
                    //                 "dec5": {
                    //                     "accrInt": 0.00000,
                    //                     "negAccr": 0.00000
                    //                 }
                    //             },
                    //             "tmZoneCode": "thbkk"
                    //         },
                    //         {
                    //             "_Id": "4QtF4wUQeGuPD-----1F-E7-",
                    //             "_attch": null,
                    //             "_cLogRef": "4QtF4wUQaJ4sZ-----1F----",
                    //             "_flags": null,
                    //             "_schVn": 0,
                    //             "_uLog": "4QtF4wUQeGuPD---0F1F-EB-",
                    //             "_uLogRef": "4QtF4wUQaJ4sZ-----1F----",
                    //             "_vn": 1,
                    //             "acctGroup": 3,
                    //             "acctNbr": "600000000016",
                    //             "acctgSeg": {
                    //                 "deptId": "350",
                    //                 "vertical": "01"
                    //             },
                    //             "assetClass": null,
                    //             "assetId": null,
                    //             "bal": 100000.00,
                    //             "branch": "21",
                    //             "ccyCode": "THB",
                    //             "closeDtm": null,
                    //             "closeReason": null,
                    //             "collectedBal": null,
                    //             "crLimit": 0.00,
                    //             "customerType": "0702",
                    //             "firstDisbmtDtm": null,
                    //             "glCat": 1,
                    //             "glSetCode": null,
                    //             "maturityDtm": null,
                    //             "nextPosnCalDtm": null,
                    //             "openDate": "2019-08-26",
                    //             "openDtm": "2019-08-26T07:03:03.439042+07:00",
                    //             "payoff": null,
                    //             "posnAcctNbr": "60000000001602",
                    //             "posnName": null,
                    //             "posnNbr": 2,
                    //             "processFlags": null,
                    //             "prodName": "7200120090001",
                    //             "purpose": null,
                    //             "region": null,
                    //             "riskRating": null,
                    //             "subBals": {
                    //                 "dec2": {
                    //                     "lnFee": 0.00,
                    //                     "lateChrg": 0.00
                    //                 },
                    //                 "dec5": {
                    //                     "accrInt": 0.00000,
                    //                     "negAccr": 0.00000
                    //                 }
                    //             },
                    //             "tmZoneCode": "thbkk"
                    //         }
                    //     ];
                    const maximum = Math.max(...data.map(item => item.posnNbr));
                    console.log(maximum);
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
