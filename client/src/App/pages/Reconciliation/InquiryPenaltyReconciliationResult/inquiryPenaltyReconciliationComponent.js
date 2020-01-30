import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Container, Row, Table } from 'reactstrap';
import DynamicHeader from '../../Header';
import inputModel from './model.json';
import SpinnerLoader from '../../loading';
import fieldHeader from './fieldRes.js'

class InquiryPenaltyReconciliationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date_penalty: "",
            dataRes: [],
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
        this.setState({ loading: true ,dataRes:[] });

        setTimeout(() => {
            fetch('/api/inquiryPenalty/' + this.state.date_penalty)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        this.setState({
                            isFound: true,
                            loading: false,
                            dataRes: data.rs_body.penalty_reconciliation_list
                        })
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
        let header = [];
        header.push(<th>#&nbsp;</th>);
        fieldHeader.penalty_reconciliation_list.map(item => {
                header.push(<th>{item}&nbsp;</th>);
        })
        return header;
    };

    getBodyTable = () => {
        let data = this.state.dataRes;
        let body = [];
        // eslint-disable-next-line
        for (let index in data) {
            let num = Number(index) + 1;
            let obj = [];
            obj.push(<td>{num}</td>);
            let value = this.getFieldHeader();
            if (data.hasOwnProperty(index)) {
                // eslint-disable-next-line
                for (let ResHeader in data[index]) {
                    if (typeof data[index][ResHeader] === "object") {
                        // eslint-disable-next-line
                        for (let inObj in data[index][ResHeader]) {
                            // eslint-disable-next-line
                            for (let keyInObj in data[index][ResHeader][inObj]) {
                                value[keyInObj] = data[index][ResHeader][inObj][keyInObj];
                            }
                        }
                    } else {
                        if (typeof data[index][ResHeader] === "boolean") {
                            let catchup = String(data[index][ResHeader]);
                            value[ResHeader] = catchup;
                        }else{
                            value[ResHeader] = data[index][ResHeader];
                        } 
                    }
                }
                // eslint-disable-next-line
                for (let indexValue in value) {
                    obj.push(<td>{value[indexValue]}</td>);
                }
                body.push(<tr>{obj}</tr>);
            }
        }
        return body;
    };

    getFieldHeader = () => {
        let key = {};
        fieldHeader.penalty_reconciliation_list.map(item => {
            key[item] = "";
        })
        return key;
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
                        <Col>
                            <div class="table-responsive" style={{ marginBottom: 50, marginTop: 10 }} >
                                <Table striped bordered >
                                    <thead>
                                        <tr>
                                            {this.getHeaderTable()}
                                        </tr>
                                    </thead>
                                    {this.state.isFound && <tbody>
                                        {this.getBodyTable()}
                                    </tbody>}
                                </Table>
                                <div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}
export default InquiryPenaltyReconciliationComponent;