import React, { Component } from 'react';
import { Button, Container, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import DynamicHeader from '../Header.js';
import inputModel from './model.json';
import utility from '../Utility.js';

class InquiryLoanAccountComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account_number: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    }

    Clicked(event) {
        event.preventDefault();
        console.log(this.state);
        fetch('/api/inqLoanAccount/' + this.state.account_number, {}).then(response => response.json())
        .then(data => {
            if (data.rs_body) {
                utility.clearSessionStorage("response_inqLoanAccount");
                sessionStorage.setItem("response_inqLoanAccount", JSON.stringify(data.rs_body));
                window.open('/ilaSummary', '_self');
            } else {
                alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                    + "error desc : " + data.errors.map(error => error.error_desc));
            }

        }).catch(error => console.log(error))
    };

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.type === "number" ? Number(event.target.value) : event.target.value });
    };

    FormInputData = () => {
        return inputModel.model.map(item => {
            return (
                <FormGroup>
                    <Label>{item.label}</Label>
                    <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                        value={this.state[item.value]} onChange={this.handleChange} />
                </FormGroup>
            );
        });
    };

    render() {
        return (
            <div>
                <DynamicHeader />
                <h2>Form Input Inquiry Account</h2>
                <Container>
                    <Row>
                        <Col md={{ size: 4, offset: 4 }}>
                            <Form onSubmit={this.Clicked}>
                                {this.FormInputData()}
                                <div class="text-center">
                                    <Button color="primary" type="submit">Submit</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    };
}

export default InquiryLoanAccountComponent;
