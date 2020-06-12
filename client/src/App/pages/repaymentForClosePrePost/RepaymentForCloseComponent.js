import React, {Component} from 'react';
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import DynamicHeader from '../Header.js';
import inputModel from './model.json';
import utility from '../Utility.js';
import SpinnerLoader from '../loading.js';

const cloneDeep = require('lodash.clonedeep');

class RepaymentForCloseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rq_body: {
                account_number: 0,
                transaction_amount: 0,
                effective_date: "",
                channel_post_date: "",
                currency_code: "THB",
                // user_id:"",
                service_branch: 0,
                clearing_and_settlement_key: "CBS",
                // source_account:""
                // comment: ""
            },
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        if (JSON.parse(sessionStorage.getItem("account_number"))) {
            const body = {
                account_number: JSON.parse(sessionStorage.getItem("account_number")),
                transaction_amount: 0,
                effective_date: "",
                channel_post_date: "",
                currency_code: "THB",
                // user_id:"",
                service_branch: 0,
                clearing_and_settlement_key: "CBS",
                // source_account:"",
                // comment: ""
            }
            this.setState({rq_body: body});
        }
    }

    handleChange(event) {
        const {rq_body} = {...this.state};
        const currentState = rq_body;
        currentState[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
        this.setState({rq_body: currentState});
    };

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
    };

    postList = (request) => {
        console.log("myRequest : " + JSON.stringify(request));
        fetch('/api/repaymentForClosePrePost', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request),
        })
            .then(response => response.json())
            .then(data => {

                if (data.rs_body) {
                    window.open('/rpmfcpreSummary', '_self');

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
                               value={this.state.rq_body[item.value]} onChange={this.handleChange}/>
                    </FormGroup>
                );
            } else {
                return (
                    <FormGroup>
                        <Label>{item.label}</Label>
                        <Input type={item.type} name={item.name} placeholder={item.placeholder} step="any"
                               value={this.state.rq_body[item.root][item.value]} onChange={this.handleChange}/>
                    </FormGroup>
                );
            }
        });
    };
    render() {
        const { loading } = this.state;
        return (
            <div>
                <DynamicHeader/>
                <h2>Form Input Repayment For Close PrePost</h2>
                <Container>
                    <Row>
                        <Col md={{size: 4, offset: 4}}>
                            <Form onSubmit={this.handleSubmit}>
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

export default RepaymentForCloseComponent;
