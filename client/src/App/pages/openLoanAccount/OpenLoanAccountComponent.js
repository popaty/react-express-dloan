import React, {Component} from 'react';
import DynamicHeader from '../Header.js';

import {Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import v000 from './v000.json';
import v001 from './v001.json';
import v002 from './v002.json';
import v003 from './v003.json';
import formModel from './model.json';

var cloneDeep = require('lodash.clonedeep');

class OpenLoanAccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rq_body :{
                customer_number: "",
                customer_type: "",
                account_name: "",
                credit_limit: 0,
                credit_term_number: 0,
                credit_term_unit: "",
                product_name: "",
                disbursement_account: "",
                deduction_account: "",
                account_branch: 0,
                response_unit: 0,
                application_id: "",
                interest : {
                    interest_index: "",
                    interest_spread: 0
                },
                payment : {
                    payment_frequency: 0,
                    payment_unit: "",
                    payment_date: 0,
                    billing_offset_day: 0
                }
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadJson = this.loadJson.bind(this);
    }

    handleChange(event) {
        //this.setState({[event.target.name]:event.target.value});
        const {rq_body} = {...this.state};
        const currentState = rq_body;
        const interest = currentState.interest;
        const payment = currentState.payment;

        if (event.target.name === "interest_index" || event.target.name === "interest_spread") {
            interest[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
        } else if (event.target.name === "payment_frequency" || event.target.name === "payment_unit" ||
            event.target.name === "payment_date" || event.target.name === "billing_offset_day") {
            payment[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
        } else {
           currentState[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
       }
        this.setState({rq_body : currentState});
       
    }

    handleSubmit(event) {
        event.preventDefault()
        //clone state for use in omit function.
        var body = cloneDeep(this.state);
        let request = this.omitfield(body);
        console.log(request);
        this.postList(request);
    }

    omitfield =(body) =>{
        for(let key in body.rq_body){
             if(typeof body.rq_body[key] === "object" ){   
              for(let subkey in body.rq_body[key]){
                    if(body.rq_body[key][subkey] === "" || body.rq_body[key][subkey] === 0){
                        delete body.rq_body[key][subkey];
                    }
              }
              if(Object.keys(body.rq_body[key]).length === 0){
                    delete body.rq_body[key];
                } 
             }else if(body.rq_body[key] === "" || body.rq_body[key] === 0){
                    delete body.rq_body[key];
             }
        }
        return body;
    }


    loadJson(event){

        if(event.target.name === "000"){
            this.setState(v000);
        }
        if(event.target.name === "001"){
            this.setState(v001);
        }
        if(event.target.name === "002"){
            this.setState(v002);
        }
        if(event.target.name === "003"){
            this.setState(v003);
        }
        
    }

    postList = (request) => {
      // console.log("myRequest : " + JSON.stringify(request));
      // fetch('/api/openLoanAccount', {
      //     method: 'POST',
      //     headers: {
      //         "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify(request)
      // })
      //     .then(response => response.json())
      //     .then(data => {

          let data = {
            "rs_body": {
              "account_number": "111111111004",
              "open_date": "13-09-2019"
            }
          }
              if (data.rs_body) {
                  sessionStorage.setItem("data_openLoanAccount", JSON.stringify(data));
                  window.open('/olaSummary', '_self');
              }else{
                  alert("error code : "+data.errors.map(error => error.error_code)+"\n"
                      +"error desc : "+ data.errors.map(error => error.error_desc));
              }
          // }).catch(error => console.log(error))
  };


  FormInputCol1 = () => {
        let formUI = formModel.model.map(item => {
           if(item.root === null){
            return(
            <FormGroup>
               <Label>{item.label}</Label>
              <Input type={item.type} name={item.name} placeholder={item.placeholder}
               value={this.state.rq_body[item.value]} onChange={this.handleChange} />
             </FormGroup>
            );
          }else{
            return(
              <FormGroup>
                <Label>{item.label}</Label>
                <Input type={item.type} name={item.name} placeholder={item.placeholder}
                value={this.state.rq_body[item.root][item.value]} onChange={this.handleChange} />
              </FormGroup>
            );
          }
        });
        return formUI;
    }

    FormInputCol2 = () => {
      let formUI = formModel.model2.map(item => {
         if(item.root === null){
          return(
          <FormGroup>
             <Label>{item.label}</Label>
            <Input type={item.type} name={item.name} placeholder={item.placeholder}
             value={this.state.rq_body[item.value]} onChange={this.handleChange} />
           </FormGroup>
          );
        }else{
          return(
            <FormGroup>
              <Label>{item.label}</Label>
              <Input type={item.type} name={item.name} placeholder={item.placeholder}
              value={this.state.rq_body[item.root][item.value]} onChange={this.handleChange} />
            </FormGroup>
          );
        }
      });
      return formUI;
    }

    render() {
     // var test = this.FormInput();
     // console.log(test);
        return (    
          <div>
            <DynamicHeader />
           <br />
           <h2 align="center">Form Input Open Account</h2>
            <br />
            <UncontrolledDropdown align="center">
                    <DropdownToggle caret color="secondary" >Select validation here &nbsp;</DropdownToggle>
                    <DropdownMenu >
                        <DropdownItem name="000" onClick={this.loadJson}>Select validation here</DropdownItem>
                        <DropdownItem name="001" onClick={this.loadJson}>Input body Open Account Validation 001</DropdownItem>
                        <DropdownItem name="002" onClick={this.loadJson}>Input body Open Account Validation 002</DropdownItem>
                        <DropdownItem name="003" onClick={this.loadJson}>Input body Open Account Validation 003</DropdownItem>
                    </DropdownMenu>
            </UncontrolledDropdown>
            <br />
            <Form onSubmit={this.handleSubmit}>
            <Row > 
              <Col md={{ size: 3, offset: 3 }} >
                {this.FormInputCol1()}
            </Col>

            <Col md={{ size: 3 }}>
                {this.FormInputCol2()}
            </Col>
            </Row>

            <div align="center">
                <Button color="primary" type="submit" >Submit</Button> 
            </div>
            <br />
            </Form>
            </div>
        //     <Form onSubmit={this.handleSubmit}>
        //       {/* <span class="badge badge-light"> */}
        //     <Row > 
            
        //     <Col md={{ size: 3, offset: 3 }} >
         
        // //     <FormGroup>
        // //       <Label>Customer number</Label>
        // //       <Input type="text" name="customer_number" placeholder="Enter customer number" 
        //       value={this.state.rq_body.customer_number} onChange={this.handleChange} />
        //     </FormGroup>
            
        //     <FormGroup>
        //       <Label>Account name</Label>
        //       <Input type="text" name="account_name" placeholder="Enter account name" 
        //       value={this.state.rq_body.account_name} onChange={this.handleChange} />
        //     </FormGroup>

        //     <FormGroup>
        //       <Label>Customer type</Label>
        //       <Input type="text" name="customer_type" placeholder="Enter customer type" 
        //       value={this.state.rq_body.customer_type} onChange={this.handleChange} />
        //     </FormGroup>

        //     <FormGroup>
        //       <Label>Credit limit</Label>
        //       <Input type="number" name="credit_limit"  
        //       value={this.state.rq_body.credit_limit} onChange={this.handleChange} />
        //     </FormGroup>

        //     <FormGroup>
        //       <Label>Credit term number</Label>
        //       <Input type="number" name="credit_term_number"  
        //       value={this.state.rq_body.credit_term_number} onChange={this.handleChange} />
        //     </FormGroup>

        //     <FormGroup>
        //       <Label>Credit term unit</Label>
        //       <Input type="text" name="credit_term_unit" placeholder="Enter credit term unit" 
        //       value={this.state.rq_body.credit_term_unit} onChange={this.handleChange} />
        //     </FormGroup>
            
        //     <FormGroup>
        //       <Label>Product name</Label>
        //       <Input type="text" name="product_name" placeholder="Enter product name" 
        //       value={this.state.rq_body.product_name} onChange={this.handleChange} />
        //     </FormGroup>

        //     <FormGroup>
        //       <Label>Disbursement account</Label>
        //       <Input type="text" name="disbursement_account" placeholder="Enter disbursement account" 
        //       value={this.state.rq_body.disbursement_account} onChange={this.handleChange} />
        //     </FormGroup>

        //     <FormGroup>
        //       <Label>Deduction account</Label>
        //       <Input type="text" name="deduction_account" placeholder="Enter deduction account" 
        //       value={this.state.rq_body.deduction_account} onChange={this.handleChange} />
        //     </FormGroup>
            
            // </Col>


            //  <Col md={{ size: 3 }}>
        //     <FormGroup>
        //       <Label>Account branch</Label>
        //       <Input type="number" name="account_branch"  
        //       value={this.state.rq_body.account_branch} onChange={this.handleChange} />
        //     </FormGroup>

        //     <FormGroup>
        //       <Label>Response unit</Label>
        //       <Input type="number" name="response_unit"  
        //       value={this.state.rq_body.response_unit} onChange={this.handleChange} />
        //     </FormGroup>

        //     <FormGroup>
        //       <Label>Application id</Label>
        //       <Input type="text" name="application_id" placeholder="Enter application id" 
        //       value={this.state.rq_body.application_id} onChange={this.handleChange} />
        //     </FormGroup>

        //     <FormGroup>
        //       <Label>Interest index</Label>
        //       <Input type="text" name="interest_index" placeholder="Enter interest index" 
        //       value={this.state.rq_body.interest.interest_index} onChange={this.handleChange} />
        //     </FormGroup>

        //     <FormGroup>
        //       <Label>Interest spread</Label>
        //       <Input type="number" name="interest_spread"  
        //       value={this.state.rq_body.interest.interest_spread} onChange={this.handleChange} />
        //     </FormGroup>

        //     <FormGroup>
        //       <Label>Payment frequency</Label>
        //       <Input type="number" name="payment_frequency"  
        //       value={this.state.rq_body.payment.payment_frequency} onChange={this.handleChange} />
        //     </FormGroup>

        //     <FormGroup>
        //       <Label>Payment unit</Label>
        //       <Input type="text" name="payment_unit" placeholder="Enter payment unit" 
        //       value={this.state.rq_body.payment.payment_unit} onChange={this.handleChange} />
        //     </FormGroup>

        //     <FormGroup>
        //       <Label>Payment date</Label>
        //       <Input type="number" name="payment_date"  
        //       value={this.state.rq_body.payment.payment_date} onChange={this.handleChange} />
        //     </FormGroup>

        //     <FormGroup>
        //       <Label>Billing offset day</Label>
        //       <Input type="number" name="billing_offset_day"  
        //       value={this.state.rq_body.payment.billing_offset_day} onChange={this.handleChange} />
        //     </FormGroup>
          //   </Col>   
          // </Row>

        //   <div align="center">
        //   {/* <input  value="Submit" type="submit" /> */}
        //   {/* <button type="submit" class="btn btn-primary">Submit</button> */}
        //   <Button color="primary" type="submit" >Submit</Button> 
        //   </div>
        //   <br />
        //   {/* </span> */}
        //    </Form> 
        //  </div>
        );
    }
}

export default OpenLoanAccountComponent;
