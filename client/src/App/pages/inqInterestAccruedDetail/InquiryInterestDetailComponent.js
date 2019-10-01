import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import DynamicHeader from '../Header.js';
import inputModel from "../inqInterestAccruedDetail/model";
import utility from '../Utility.js';
import SpinnerLoader from '../loading.js';

const cloneDeep = require('lodash.clonedeep');

class inquiryInterestDetailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rq_body: {
                account_number: "",
                account_sequence: "",
                date: ""
            },
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });
        //clone state for use in omit function.
        let body = cloneDeep(this.state);
        const request = utility.omit(body);
        //console.log(request);
        setTimeout(() => {
            this.setState({ loading: false });
            this.postList(request);
        }, 1000);
    }

    handleChange(event) {
        const { rq_body } = { ...this.state };
        const currentState = rq_body;
        currentState[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
        this.setState({ rq_body: currentState });
    }

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
                    utility.clearSessionStorage("response_inqInterestAccruedDetail");
                    sessionStorage.setItem("response_inqInterestAccruedDetail", JSON.stringify(data));
                    window.open('/iiadSummary', '_self');
                } else {
                    alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                        + "error desc : " + data.errors.map(error => error.error_desc) + "\n"
                        + "error type : " + data.errors.map(error => error.error_type));
                }
            }).catch(error => console.log(error))
    };

    FormInputData = () => {
        return inputModel.model.map(item => {
            if (item.root === null) {
                return (
                    <FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                            value={this.state.rq_body[item.value]} onChange={this.handleChange} />
                    </FormGroup>
                );
            } else {
                return (
                    <FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                            value={this.state.rq_body[item.root][item.value]} onChange={this.handleChange} />
                    </FormGroup>
                );
            }
        });
    };

    render() {
        const { loading } = this.state;
        return (
            <div>
                <DynamicHeader />
                <h2>Form Input Inquiry Interest Accrued Details</h2>
                <br />
                <Col md={{ size: 4, offset: 4 }}>
                    <Form onSubmit={this.handleSubmit}>
                        {this.FormInputData()}
                        <br />
                            <div class="text-center">
                                <Button color="primary" type="submit" disabled={loading}>
                                    {loading && (<SpinnerLoader />)}
                                    {loading && <span>Loading..</span>}
                                    {!loading && <span>Submit</span>}
                                </Button>
                            </div>
                        <br />
                    </Form>
                </Col>
            </div>
        );
    }
}

export default inquiryInterestDetailComponent;
