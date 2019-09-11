import React, {Component} from 'react';
import DynamicHeader from '../Header.js';
import SpinnerLoader from '../loading.js';

import {Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import v000 from './v000.json';
import v001 from './v001.json';
import v002 from './v002.json';
import v003 from './v003.json';
import inputModel from './model.json';

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
    };

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
       
    };

    handleSubmit(event) {
        event.preventDefault()
        this.setState({ loading: true });
        //clone state for use in omit function.
        var body = cloneDeep(this.state);
        let request = this.omitfield(body);
        console.log(request);
        setTimeout(() => {
          this.setState({ loading: false });
          this.postList(request);
        }, 1500);
    };

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
    };


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
    };

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
        let formUI = inputModel.model.map(item => {
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
    };

    FormInputCol2 = () => {
      let formUI = inputModel.model2.map(item => {
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
    };

    render() {
      const { loading } = this.state;
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
                <Button color="primary" type="submit" disabled={loading} >
                  {/* Submit */}
                  {loading && (<SpinnerLoader />)}
                    {loading && <span>Loading..</span>}
                    {!loading && <span>Submit</span>}
                </Button> 
                   {/* < SpinnerLoader /> */}
            </div>
            <br />
            </Form>
            </div>
        );
    };
}

export default OpenLoanAccountComponent;
