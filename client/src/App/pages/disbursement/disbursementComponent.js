import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import DynamicHeader from '../Header.js';
import inputModel from './model.json';

var cloneDeep = require('lodash.clonedeep');

class disbursementComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            rq_body :{
                account_number: "",
                disbursement_amount: 0,
                effective_date: "",
                channel_post_date: "",
                currency_code: "THB",
                service_branch: 0,
                number_of_payment: 0,
                installment_amount: 0,
                other_properties:{
                    interest_index : "",
                    interest_spread: 0,
                    first_payment_date: ""
                }
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount(){
        if(JSON.parse(sessionStorage.getItem("installment_amount")) && JSON.parse(sessionStorage.getItem("data_openLoanAccount"))){
            let data = JSON.parse(sessionStorage.getItem("data_openLoanAccount"));
                let body = {
                    account_number: data.rs_body.account_number,
                    disbursement_amount: 0,
                    effective_date: "",
                    channel_post_date: "",
                    currency_code: "THB",
                    service_branch: 0,
                    number_of_payment: 0,
                    installment_amount: JSON.parse(sessionStorage.getItem("installment_amount")),
                    other_properties:{
                        interest_index : "",
                        interest_spread: 0,
                        first_payment_date: ""
                    }
                };
                this.setState({rq_body : body});
                console.log(this.state);
        }
    };

    handleChange(event) {
        //this.setState({[event.target.name]:event.target.value});
        const {rq_body} = {...this.state};
        const currentState = rq_body;
        const properties = currentState.other_properties;
         if(event.target.name === "interest_index" || event.target.name === "interest_spread"
            || event.target.name === "first_payment_date"){
                properties[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
         }else{
            currentState[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
        }
         this.setState({rq_body : currentState}); 
    };

    handleSubmit(event) {
        event.preventDefault()
        //clone state for use in omit function.
        var body = cloneDeep(this.state);
        let request = this.omitfield(body);
        console.log(request);
        this.postList(request);
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

    postList = (request) => {
        // console.log("myRequest : " + JSON.stringify(request));
        // fetch('/api/disbursement', {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(request),
        // })
        //     .then(response => response.json())
        //     .then(data => {

            var data = {
                "rs_body": {}
            };
        //     var data =  {  "errors": [
        //         {
        //             "error_code": "502",
        //             "error_type": "",
        //             "error_desc": "Error unmarshaling the json request payload, Caused by: Value(Unknown) - timestamp needs to conform to IETF RFC3339, time zones optional Format(Unknown) - ",
        //             "error_detail": "",
        //             "exception": {}
        //         },
        //         {
        //             "error_code": "E88020004",
        //             "error_type": "OTHER",
        //             "error_desc": "Cannot parse JSON Body",
        //             "error_detail": "Cannot parse JSON Body, Caused by: Error unmarshaling the json request payload, Caused by: Value(Unknown) - timestamp needs to conform to IETF RFC3339, time zones optional Format(Unknown) - "
        //         }
        //     ]
        // }
            if (data.rs_body) {
                window.open('/dbmSummary', '_self');
            }else{
                // const errorData = data.errors.map(error => error.error_code)+"\n";
                // alert(errorData);
                alert("error code : "+data.errors.map(error => error.error_code)+"\n"
                 +"error desc : "+ data.errors.map(error => error.error_desc)+"\n"
                 +"error type : "+ data.errors.map(error => error.error_type));
            }
            // }).catch(error => console.log(error))
    };


    FormInputData = () => {
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

    render() {
        return(
            <div>
                <DynamicHeader />
            <br />
                <h2 align="center">Form Input Disbursement</h2>
            <br />
            <Row>
                <Col  md={{ size: 4, offset: 4 }}>
            <Form onSubmit={this.handleSubmit}>
                {this.FormInputData()}    
                {/* <FormGroup>
                        <Label>Account number</Label>
                        <Input type="text" name="account_number" 
                        value={this.state.rq_body.account_number} onChange={this.handleChange}  />
                        </FormGroup>
                        
                        <FormGroup>
                        <Label>Disbursement amount</Label>
                        <Input type="number" name="disbursement_amount"  
                        value={this.state.rq_body.disbursement_amount} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                        <Label>Effective date</Label>
                        <Input type="date" name="effective_date"  data-date-format="YYYY-MM-DD" 
                        value={this.state.rq_body.effective_date} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                        <Label>Channel post date</Label>
                        <Input type="date" name="channel_post_date" data-date-format="YYYY-MM-DD"  
                        value={this.state.rq_body.channel_post_date} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                        <Label>Currency code</Label>
                        <Input type="text" name="currency_code" placeholder="Enter currency code"
                        value={this.state.rq_body.currency_code} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                        <Label>Service branch</Label>
                        <Input type="number" name="service_branch" 
                        value={this.state.rq_body.service_branch} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                        <Label>Number of payment</Label>
                        <Input type="number" name="number_of_payment" 
                        value={this.state.rq_body.number_of_payment} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                        <Label>Installment amount</Label>
                        <Input type="number" name="installment_amount"
                        value={this.state.rq_body.installment_amount} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                        <Label>Interest index</Label>
                        <Input type="text" name="interest_index" placeholder="Enter interest index"
                        value={this.state.rq_body.other_properties.interest_index} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                        <Label>Interest spread</Label>
                        <Input type="number" name="interest_spread" placeholder="Enter interest spread"
                        value={this.state.rq_body.other_properties.interest_spread} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                        <Label>First payment date</Label>
                        <Input type="date" name="first_payment_date" data-date-format="YYYY-MM-DD"                   
                        value={this.state.rq_body.other_properties.first_payment_date} onChange={this.handleChange} />
                        </FormGroup> */}
                        <br />
                        <div align="center">
                            <Button color="primary" type="submit" >Submit</Button> 
                        </div>
                        <br />
            </Form>
            </Col>
            </Row>   
        </div>
           );
       };
}

export default disbursementComponent;