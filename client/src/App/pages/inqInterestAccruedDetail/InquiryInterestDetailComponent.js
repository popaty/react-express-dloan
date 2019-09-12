import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Col, Row} from 'reactstrap';
import DynamicHeader from '../Header.js';
import inputModel from "../inqInterestAccruedDetail/model";

var cloneDeep = require('lodash.clonedeep');

class inquiryInterestDetailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rq_body : {
                account_number: "",
                account_sequence: "",
                first_date: "",
                second_number: ""
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    }

    Clicked(event) {
        event.preventDefault()
        event.preventDefault()
        //clone state for use in omit function.
        var body = cloneDeep(this.state);
        let request = this.omitfield(body);
        // console.log(request);
        this.postList(request);
    }

    handleChange(event) {
        const {rq_body} = {...this.state};
        const currentState = rq_body;
        currentState[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
        this.setState({rq_body : currentState});
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
    };


    postList = (request) => {
        console.log("myRequest : " + JSON.stringify(request));
        fetch('/api/inqInterestAccruedDetail', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request),
        })
            .then(response => response.json())
            .then(data => {
        if (data.rs_body) {
            sessionStorage.setItem("data_inqInterestAccruedDetail", JSON.stringify(data));
            window.open('/iiadSummary', '_self');
        }else{
            alert("error code : "+data.errors.map(error => error.error_code)+"\n"
                +"error desc : "+ data.errors.map(error => error.error_desc)+"\n"
                +"error type : "+ data.errors.map(error => error.error_type));
        }
         }).catch(error => console.log(error))
    };

    FormInputData = () => {
        let formUI = inputModel.model.map(item => {
            if (item.root === null) {
                return (
                    <FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder}
                               value={this.state.rq_body[item.value]} onChange={this.handleChange}/>
                    </FormGroup>
                );
            } else {
                return (
                    <FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder}
                               value={this.state.rq_body[item.root][item.value]} onChange={this.handleChange}/>
                    </FormGroup>
                );
            }
        });
        return formUI;
    };

    render() {
        return (
            <div>
                <DynamicHeader/>
                <br/>
                <h2 align="center">Form Inquiry Interest Accrued Details</h2>
                <br/>
                <Row>
                    <Col md={{size: 4, offset: 4}}>
                        <Form onSubmit={this.handleSubmit}>
                            {this.FormInputData()}
                            <br/>
                            <div align="center">
                                <Button color="primary" type="submit">Submit</Button>
                            </div>
                            <br/>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default inquiryInterestDetailComponent;
