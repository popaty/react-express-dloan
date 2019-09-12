import React, {Component} from 'react';
import { Button, Col,Table} from 'reactstrap';
import DynamicHeader from '../Header.js';

class inquiryPositionSummery extends Component {

    constructor(props){
        super(props);
        this.state = {
            account: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    CallInquiryLoanAccount(){
        var data = JSON.parse(sessionStorage.getItem("data_inqLoanAccount"));
        console.log(data.rs_body.account_number);
        fetch('/api/inqLoanAccount/'+data.rs_body.account_number, {
        }).then(response => response.json())
            .then(data => {
                console.log(data);
        // var data = {
        //     "rs_body": {
        //         "account_number": "111111111004",
        //         "product_name": "7200120090001",
        //         "customer_number": "12111111111",
        //         "customer_type": "0702",
        //         "account_name": "นางสาวกานดา มาดีไกล",
        //         "currency": "THB",
        //         "account_branch": 1,
        //         "response_unit": 2,
        //         "credit_term_number": 12,
        //         "credit_term_unit": "M",
        //         "disbursement_account": "20000002010",
        //         "open_date": "2019-08-23",
        //         "application_id": "APP0001",
        //         "closed_date": "",
        //         "limit": {
        //             "credit_limit": 100000,
        //             "balance": 100000,
        //             "available_balance": 100000,
        //             "maturity_date": "2020-08-19"
        //         },
        //         "payment": {
        //             "payment_frequency": 1,
        //             "payment_unit": "M",
        //             "payment_date": 31,
        //             "payment_calculation_method": "installment",
        //             "billing_offset_day": 1,
        //             "deduction_account": "20000002010"
        //         },
        //         "interest": {
        //             "interest_index": "MRR",
        //             "interest_spread": 12,
        //             "interest_rate": 19.12,
        //             "penalty_index": "pen",
        //             "penalty_rate": 28,
        //             "grace_day": 5,
        //             "is_catch_up": true
        //         }
        //     }
        // }
        if (data.rs_body) {
            sessionStorage.setItem("data_inqLoanAccount", JSON.stringify(data.rs_body));
            window.open('/ilaSummary', '_self');
        }else{
            alert("error code : "+data.errors.map(error => error.error_code)+"\n"
                +"error desc : "+ data.errors.map(error => error.error_desc));
        }

        }).catch(error => console.log(error))
    }

    handleChange(event) {
        this.setState({account : event.target.value});
    }

    dynamicResponse = (data) => {
        let table = [];
        let children = [];

        for(let key in data){
            if(typeof data[key] === "object"){
                let obj = [];
                for(let subdata in data[key]){
                    if(typeof data[key][subdata] === "boolean"){
                        var catchup = String(data[key][subdata] );
                        obj.push(<tr><td>{subdata}</td><td>{catchup}</td></tr>)
                    }else{
                        obj.push(<tr><td>{subdata}</td><td>{data[key][subdata]}</td></tr>);
                    }
                }
                children.push(<tr><td>{key+" : "}</td><td><Table>{obj}</Table></td></tr>);
            }else{
                children.push(<tr><td>{key}</td><td>{data[key]}</td></tr>);
            }
        }
        table.push(<Table bordered >{children}</Table>)
        return table;
    }

    render() {
        var data = JSON.parse(sessionStorage.getItem("data_inqPositionDetail"));
        return(
            <div className="App">
                <DynamicHeader />
                <form>
                    <br />
                    <h2 >Form Data Inquiry Position Detail</h2>
                    <br />
                    <Col md={{ size: 6, offset: 3 }} >
                        {this.dynamicResponse(data)}
                    </Col>
                    <br />
                    {/* <Button color="success" onClick={this.Clicked}>Inquiry Interest Accrued</Button><br /><br /> */}
                    <Button color="success" onClick={this.CallInquiryLoanAccount} >Inquiry Account Details </Button>
                </form>
            </div>
        );
    }
}

export default inquiryPositionSummery;
