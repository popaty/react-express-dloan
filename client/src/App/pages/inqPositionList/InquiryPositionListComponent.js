import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Container, Row} from 'reactstrap';
import DynamicHeader from '../Header.js';
import inputModel from './model.json';
import utility from '../Utility.js';
import SpinnerLoader from '../loading.js';

class inquiryPositionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account_number: "",
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    }

    componentDidMount() {
        if (JSON.parse(sessionStorage.getItem("account_number"))) {
            this.setState({ account_number : JSON.parse(sessionStorage.getItem("account_number")) });
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.type === "number" ? Number(event.target.value) : event.target.value});
    }

    Clicked(event) {
        event.preventDefault();
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({ loading: false });
            fetch('/api/inquiryPositionList/' + this.state.account_number)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    utility.clearSessionStorage("response_inqPositionList");
                    sessionStorage.setItem("response_inqPositionList", JSON.stringify(data.rs_body.position_detail));
                    window.open('/iplSummary', '_self');
                } else {
                    alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                        + "error desc : " + data.errors.map(error => error.error_desc) + "\n"
                        + "error type : " + data.errors.map(error => error.error_type));
                }
            }).catch(error => console.log(error))
        }, 1000);
      
    };

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
        const { loading } = this.state;
        return (
            <div>
                <DynamicHeader />
                <h2>Form Input Inquiry Position List</h2>
                <br />
                <Container>
                    <Row>
                        <Col md={{size: 4, offset: 4}}>
                            <Form onSubmit={this.Clicked}>
                                {this.FormInputData()}
                                <div class="text-center">
                                    <Button color="primary" type="submit" disabled={loading}>
                                        {loading && (<SpinnerLoader />)}
                                        {loading && <span>Loading..</span>}
                                        {!loading && <span>Submit</span>}
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default inquiryPositionComponent;
