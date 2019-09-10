import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import DynamicHeader from '../Header.js';

var cloneDeep = require('lodash.clonedeep');

class installmentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rq_body :{
                disbursement_amount: 0,
                number_of_payment: 0,
                interest_rate: 0,
                payment_frequency: 0,
                payment_unit: "",
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        if(JSON.parse(sessionStorage.getItem("interest_rate")) && JSON.parse(sessionStorage.getItem("payment_frequency")) 
            && JSON.parse(sessionStorage.getItem("payment_unit"))){
                let body = {
                        disbursement_amount: 0,
                        number_of_payment: 0,
                        interest_rate: JSON.parse(sessionStorage.getItem("interest_rate")),
                        payment_frequency: JSON.parse(sessionStorage.getItem("payment_frequency")),
                        payment_unit: JSON.parse(sessionStorage.getItem("payment_unit"))
                    
                };
                this.setState({rq_body : body});
                console.log(this.state);
        }
    }

    handleChange(event) {
        //this.setState({[event.target.name]:event.target.value});
         const {rq_body} = {...this.state};
         const currentState = rq_body;
         currentState[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
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

    postList = (request) => {
        console.log("myRequest : " + JSON.stringify(request));
        // fetch('/api/calculateInstallment', {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(request),
        // })
        //     .then(response => response.json())
        //     .then(data => {
                
            var data = {
                    "rs_body": {
                      "installment_amount": 700000000024
                    }
                  }
                
                if (data.rs_body) {
                    sessionStorage.setItem("data_installment", JSON.stringify(data));
                    window.open('/ciaSummary', '_self');
                }else{
                    alert("error code : "+data.errors.map(error => error.error_code)+"\n"
                     +"error desc : "+ data.errors.map(error => error.error_desc)+"\n"
                     +"error type : "+ data.errors.map(error => error.error_type));
                }
          //  }).catch(error => console.log(error))
    };


    render() {
        return (
         <div>
             <DynamicHeader />
            <br />
                <h2 align="center">Form Input Calculate Installment Amount</h2>
            <br />
            <Form onSubmit={this.handleSubmit}>
            <Row>
                <Col  md={{ size: 4, offset: 4 }}>
                <FormGroup>
                        <Label>Disbursement amount</Label>
                        <Input type="number" name="disbursement_amount" 
                        value={this.state.rq_body.disbursement_amount} onChange={this.handleChange}  />
                        </FormGroup>
                        
                        <FormGroup>
                        <Label>Number of payment</Label>
                        <Input type="number" name="number_of_payment"  
                        value={this.state.rq_body.number_of_payment} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                        <Label>Interest rate</Label>
                        <Input type="number" name="interest_rate"  
                        value={this.state.rq_body.interest_rate} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                        <Label>Payment frequency</Label>
                        <Input type="number" name="payment_frequency"  
                        value={this.state.rq_body.payment_frequency} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                        <Label>payment unit</Label>
                        <Input type="text" name="payment_unit" placeholder="Enter payment unit"
                        value={this.state.rq_body.payment_unit} onChange={this.handleChange} />
                        </FormGroup>
                        <br />
                        <div align="center">
                            <Button color="primary" type="submit" >Submit</Button> 
                        </div>
                        <br />
                </Col>
            </Row>       
            </Form>
        </div>
        );
        }
}
export default installmentComponent;
