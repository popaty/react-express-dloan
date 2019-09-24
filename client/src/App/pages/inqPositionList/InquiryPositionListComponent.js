import React, {Component} from 'react';
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import DynamicHeader from '../Header.js';

class inquiryPositionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    }

    componentDidMount() {
        if (JSON.parse(sessionStorage.getItem("account_number"))) {
            this.setState({account: JSON.parse(sessionStorage.getItem("account_number"))});
        }
    }

    handleChange(event) {
        this.setState({account: event.target.value});
    }

    Clicked(event) {
        event.preventDefault();
        fetch('/api/inquiryPositionList/' + this.state.account)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    sessionStorage.setItem("response_inqPositionList", JSON.stringify(data.rs_body));
                    window.open('/iplSummary', '_self');
                } else {
                    alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                        + "error desc : " + data.errors.map(error => error.error_desc) + "\n"
                        + "error type : " + data.errors.map(error => error.error_type));
                }
            }).catch(error => console.log(error))
    };

    render() {
        return (
            <div className="App">
                <DynamicHeader/>
                <h2>Form Input Inquiry Position List</h2>
                <br/>
                <Container>
                    <Row>
                        <Col md={{size: 6, offset: 3}}>
                            <Form inline onSubmit={this.Clicked}>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label>Account Number : &nbsp;</Label>
                                    <Input type="text" value={this.state.account} placeholder="Enter account number"
                                           onChange={this.handleChange}/>
                                </FormGroup>
                                <Button color="primary" type="submit">Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default inquiryPositionComponent;
