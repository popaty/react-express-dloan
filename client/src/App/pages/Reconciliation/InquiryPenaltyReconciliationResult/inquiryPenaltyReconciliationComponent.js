import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Container, Row, Table } from 'reactstrap';
import DynamicHeader from '../../Header';
import inputModel from './model.json';
import utility from '../../Utility';
import SpinnerLoader from '../../loading';

class InquiryPenaltyReconciliationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date_penalty: "",
            dateRes: [],
            isFound: false,
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value === "" ? null : event.target.value });
    }

    Clicked(event) {
        event.preventDefault();
        this.setState({ loading: true });

        setTimeout(() => {
            fetch('/api/inquiryPenalty/' + utility.StringAD() + this.state.date_penalty)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        this.setState({
                            isFound: true,
                            loading: false,
                            dateRes: data.rs_body.penalty_reconciliation_list
                        });
                        // utility.clearSessionStorage("response_inquiryPenalty");
                        // sessionStorage.setItem("response_inquiryPrincipal", JSON.stringify(data.rs_body.position_detail));
                        // window.open('/iplSummary', '_self');
                    } else {
                        alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                            + "error desc : " + data.errors.map(error => error.error_desc) + "\n"
                            + "error type : " + data.errors.map(error => error.error_type));
                    }
                }).catch(error => console.log(error))
            this.setState({ loading: false });
        }, 1000);

    };

    getHeaderTable = () => {
        let data = this.state.dateRes;
        let header = [];
        if (data.length > 1) {
            header.push(<th>#&nbsp;</th>);
            // eslint-disable-next-line
            for (let key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                    header.push(<th>{key}&nbsp;</th>);
                }
            }

        } else {
            // eslint-disable-next-line
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    header.push(<th>#&nbsp;</th>);
                    // eslint-disable-next-line
                    for (let keyinObj in data[key]) {
                        if (data[key].hasOwnProperty(keyinObj)) {
                            header.push(<th>{keyinObj}&nbsp;</th>);
                        }
                    }
                }
            }
        }
        return header;
    };

    getBodyTable = () => {
        let data = this.state.dateRes;
        let body = [];
        // eslint-disable-next-line
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let num = Number(key);
                let obj = [];
                obj.push(<td>{num + 1}</td>);
                // eslint-disable-next-line
                for (let keyinObj in data[key]) {
                    if (data[key].hasOwnProperty(keyinObj)) {
                        if (typeof data[key][keyinObj] === "boolean") {
                            let catchup = String(data[key][keyinObj]);
                            obj.push(<td>{catchup}</td>)
                        } else {
                            obj.push(<td>{data[key][keyinObj]}</td>);
                        }
                    }
                }
                body.push(<tr>{obj}</tr>);
            }
        }
        return body;
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
        const { loading } = this.state;
        return (
            <div>
                <DynamicHeader />
                <h2>Form Input Inquiry Penalty Reconciliation Result</h2>
                <Container>
                    <Row>
                        <Col md={{ size: 4, offset: 4 }}>
                            <Form onSubmit={this.Clicked}>
                                {this.FormInputData()}
                                <div class="text-center">
                                    <Button style={{ marginBottom: 60 }} color="primary" type="submit" disabled={loading}>
                                        {loading && (<SpinnerLoader />)}
                                        {loading && <span>Loading..</span>}
                                        {!loading && <span>Submit</span>}
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ size: 10, offset: 1 }}>
                            <div class="table-responsive">
                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                            {this.getHeaderTable()}
                                        </tr>
                                    </thead>
                                    {this.state.isFound && <tbody>
                                        {this.getBodyTable()}
                                    </tbody>}
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}
export default InquiryPenaltyReconciliationComponent;