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
        event.preventDefault();
        this.getInqAccount();
        //console.log(this.state);
    };

    handleChange(event) {
        this.setState({account : event.target.value});
    };

    getInqAccount = () =>{
       fetch('/api/inqLoanAccount/'+this.state.account, {
        }).then(response => response.json())
        .then(data => {
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
