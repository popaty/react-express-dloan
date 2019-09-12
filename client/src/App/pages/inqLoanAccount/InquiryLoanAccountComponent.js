import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import DynamicHeader from '../Header.js';

class InquiryLoanAccountComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
          account: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    }

    Clicked(event) {
        event.preventDefault()
        this.getInqAccount();
        console.log(this.state);
    };

    handleChange(event) {
        this.setState({account : event.target.value});
    };

    getInqAccount = () =>{
       fetch('/api/inqLoanAccount/'+this.state.account, {
        }).then(response => response.json())
        .then(data => {
                // data = {
                //     "rs_body": {
                //       "account_number": "600000000016",
                //       "product_name": "7200120090001",
                //       "customer_number": "12111111111",
                //       "customer_type": "0702",
                //       "account_name": "นางสาวกานดา มาดีไกล",
                //       "currency": "THB",
                //       "account_branch": 1,
                //       "response_unit": 2,
                //       "credit_term_number": 12,
                //       "credit_term_unit": "M",
                //       "disbursement_account": "20000002010",
                //       "open_date": "2019-08-23",
                //       "application_id": "APP0001",
                //       "closed_date": "",
                //       "limit": {
                //         "credit_limit": 100000,
                //         "balance": 100000,
                //         "available_balance": 100000,
                //         "maturity_date": "2020-08-19"
                //       },
                //       "payment": {
                //         "payment_frequency": 1,
                //         "payment_unit": "M",
                //         "payment_date": 31,
                //         "payment_calculation_method": "installment",
                //         "billing_offset_day": 1,
                //         "deduction_account": "20000002010"
                //       },
                //       "interest": {
                //         "interest_index": "MRR",
                //         "interest_spread": 12,
                //         "interest_rate": 19.12,
                //         "penalty_index": "pen",
                //         "penalty_rate": 28,
                //         "grace_day": 5,
                //         "is_catch_up": true
                //       }
                //     }
                //   };

                if (data.rs_body) {
                     sessionStorage.setItem("data_inqLoanAccount", JSON.stringify(data.rs_body));
                     window.open('/ilaSummary', '_self');
                }else{
                    alert("error code : "+data.errors.map(error => error.error_code)+"\n"
                    +"error desc : "+ data.errors.map(error => error.error_desc));
                }

        }).catch(error => console.log(error))
    };

    render() {
         return(
            <div className = "App">
              <DynamicHeader />
              <br />
                <h2>Form Input Inquiry Account</h2>
                  <br />
                    <Col md={{ size: 6, offset: 4 }}>
                    <Form inline onSubmit={this.Clicked} >
                        <FormGroup className="mb-3 mr-sm-3 mb-sm-0">
                          <Label>Account number : &nbsp;</Label>
                          <Input type="text" placeholder="Enter account number" onChange={this.handleChange} />
                           </FormGroup>
                           <Button color="primary" type="submit" >Submit</Button>
                    </Form>
                    </Col>
            </div>

        )
    };

}
export default InquiryLoanAccountComponent;
