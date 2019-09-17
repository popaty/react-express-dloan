import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
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

    Clicked(event) {
        event.preventDefault()
        // var data = JSON.parse(sessionStorage.getItem("data_inqLoanAccount"));
        //console.log(this.state.account);
        fetch('/api/inqPositionDetail/' + this.state.account)
        .then(response => response.json())
        .then(data => {
                //console.log(data);
                if (data) {
                    const maximum = Math.max(...data.map(item => item.posnNbr));
                    //console.log(maximum);
                    const getdata = data.find(element => element.posnNbr === maximum);
                    let body = {
                        account_sequence: getdata.posnNbr,
                        open_date: getdata.openDate,
                        principal_balance: getdata.bal
                    };
                    sessionStorage.setItem("data_inqPositionDetail", JSON.stringify(body));
                    window.open('/ipdprestSummary', '_self');
                } else {
                    alert("Data not found.");
                }
            }).catch(error => console.log(error))
    }

    handleChange(event) {
        this.setState({account: event.target.value});
    }

    render() {
        return (
            <div className="App">
                <DynamicHeader/>
                <br/>
                <h2>Form Input Inquiry Position Detail</h2>
                <br/>
                <Col md={{size: 6, offset: 4}}>
                    <Form inline onSubmit={this.Clicked}>
                        <FormGroup className="mb-3 mr-sm-3 mb-sm-0">
                            <Label>Account Number : &nbsp;</Label>
                            <Input type="text" placeholder="Enter account number" onChange={this.handleChange}/>
                        </FormGroup>
                        <Button color="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </div>
        );
    }
}

export default inquiryPositionComponent;
