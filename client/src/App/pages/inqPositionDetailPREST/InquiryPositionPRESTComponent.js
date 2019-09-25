import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Container, Row} from 'reactstrap';
import DynamicHeader from '../Header.js';
import inputModel from './model.json';

class inquiryPositionPRESTComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account_number: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    }

    Clicked(event) {
        event.preventDefault();
        fetch('/api/inqPositionDetail/' + this.state.account_number)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                if (data) {
                    const maximum = Math.max(...data.map(item => item.posnNbr));
                    //console.log(maximum);
                    const getdata = data.find(element => element.posnNbr === maximum);
                    const body = {
                        account_sequence: getdata.posnNbr,
                        open_date: getdata.openDate,
                        principal_balance: getdata.bal
                    };
                    sessionStorage.setItem("response_inqPositionDetail", JSON.stringify(body));
                    window.open('/ipdprestSummary', '_self');
                } else {
                    alert("Data not found.");
                }
            }).catch(error => console.log(error))
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.type === "number" ? Number(event.target.value) : event.target.value});
    }

    FormInputData = () => {
        return inputModel.model.map(item => {
                return (
                    <FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                               value={this.state[item.value]} onChange={this.handleChange}/>
                    </FormGroup>
                );
        });
    };

    render() {
        return (
            <div >
                <DynamicHeader/>
                <h2>Form Input Inquiry Position Detail pREST</h2>
                <br/>
                <Container>
                    <Row>
                        <Col md={{size: 4, offset: 4}}>
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
        );
    }
}

export default inquiryPositionPRESTComponent;