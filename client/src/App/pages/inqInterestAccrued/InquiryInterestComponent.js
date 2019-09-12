import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import DynamicHeader from '../Header.js';

class inquiryInterestComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    }

    Clicked(event) {
        event.preventDefault()
        fetch('/api/inqInterestAccrued/'+this.state.account, {
        }).then(response => response.json())
         .then(data => {
          if (data.rs_body) {
            //   var accountSequence = data.rs_body.position_detail.map(item => item.account_sequence);
            //    var interestIndex = data.rs_body.position_detail.map(item => item.interest_index);
            //    var interestSpread = data.rs_body.position_detail.map(item => item.interest_spread);
            //    //var interestRate = data.rs_body.position_detail.map(item => item.);
            //    var unpaid = data.rs_body.position_detail.map(item => item.unpaid_accrued_amount);

                // var body = {account_sequence : accountSequence[0],
                //             interest_index : interestIndex[0],
                //             interest_spread : interestSpread[0],
                //             unpaid_accrued_amount : unpaid[0]};
                sessionStorage.setItem("data_inqInterastaAccrued", JSON.stringify(data.rs_body));
                window.open('/iiaSummary', '_self');
          }else{
                alert("error code : "+data.errors.map(error => error.error_code)+"\n"
            +"error desc : "+ data.errors.map(error => error.error_desc)+"\n"
            +"error type : "+ data.errors.map(error => error.error_type));
          }
        }).catch(error => console.log(error))

    //   var data = {
    //         "rs_body": {
    //             "position_detail": [
    //                 {
    //                     "account_number": 600000000032,
    //                     "account_sequence": 1,
    //                     "interest_index": "MRR",
    //                     "interest_spread": -3.00000,
    //                     "penalty_index": "PEN",
    //                     "open_date": "2019-09-12",
    //                     "open_datetime_stamp": "2019-09-12T11:19:10Z",
    //                     "grace_day": 5,
    //                     "is_catch_up": true,
    //                     "customer_type": "0703",
    //                     "account_branch": 20,
    //                     "daily_accrued_amount": 0.10959,
    //                     "unpaid_accrued_amount": 0.00000
    //                 },
    //                 {
    //                     "account_number": 600000000032,
    //                     "account_sequence": 2,
    //                     "interest_index": "MRRs",
    //                     "interest_spread": -4.00000,
    //                     "penalty_index": "PEN",
    //                     "open_date": "2019-09-12",
    //                     "open_datetime_stamp": "2019-09-12T11:19:10Z",
    //                     "grace_day": 5,
    //                     "is_catch_up": true,
    //                     "customer_type": "0703",
    //                     "account_branch": 20,
    //                     "daily_accrued_amount": 0.10959,
    //                     "unpaid_accrued_amount": 1.00000
    //                 }
    //             ]
    //         }
    //     };
    // var data ={
    //         "errors": [
    //             {
    //                 "error_code": "E88030401",
    //                 "error_type": "INVLDINPUT",
    //                 "error_desc": "Cannot find the data of ~p0 ",
    //                 "error_detail": "internal code :90000013,caused byERROR: data not found"
    //             }
    //         ]
    //     };
          // if (data.rs_body) {
            //    var accountSequence = data.rs_body.position_detail.map(item => item.account_sequence);
            //    var interestIndex = data.rs_body.position_detail.map(item => item.interest_index);
            //    var interestSpread = data.rs_body.position_detail.map(item => item.interest_spread);
            //    //var interestRate = data.rs_body.position_detail.map(item => item.);
            //    var unpaid = data.rs_body.position_detail.map(item => item.unpaid_accrued_amount);
            //    for(let i = 0 ;i < accountSequence.length;i++){
    
            //    var body = {account_sequence : accountSequence[i],
            //                 interest_index : interestIndex[i],
            //                 interest_spread : interestSpread[i],
            //                 unpaid_accrued_amount : unpaid[i]};
            //     body+=body;
            //     }
        //         sessionStorage.setItem("data_inqInterastaAccrued", JSON.stringify(data.rs_body));
        //         window.open('/iiaSummary', '_self');
        //   }else{
        //     alert("error code : "+data.errors.map(error => error.error_code)+"\n"
        //     +"error desc : "+ data.errors.map(error => error.error_desc)+"\n"
        //     +"error type : "+ data.errors.map(error => error.error_type));
        //  }
    }

    handleChange(event) {
        this.setState({account : event.target.value});
    }

    render() {
        return(
            <div className = "App">
                <DynamicHeader />
            <br />
              <h2>Form Input Inquiry Interest Accrued</h2>
                <br />
                  <Col md={{ size: 6, offset: 4 }}> 
                  <Form inline onSubmit={this.Clicked} >
                      <FormGroup className="mb-3 mr-sm-3 mb-sm-0">
                        <Label>Account Number : &nbsp;</Label>
                        <Input type="text" placeholder="Enter account number" onChange={this.handleChange} />
                         </FormGroup>
                         <Button color="primary" type="submit" >Submit</Button>
                  </Form>
                  </Col>
          </div>
           );
       }
}

export default inquiryInterestComponent;