import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Col, Row} from 'reactstrap';
import DynamicHeader from '../Header.js';
import inputModel from "../inqInterestAccruedDetail/model";

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
        window.open('/iiaSummary', '_self');
    }

    handleChange(event) {
        this.setState({account: event.target.value});
    }

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
