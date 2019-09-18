import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import DynamicHeader from '../Header.js';

class inquiryInterestComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    }

    Clicked(event) {
        event.preventDefault()
        fetch('/api/inqInterestAccrued/'+this.state.account, {
        }).then(response => response.json())
         .then(data => {
            if (data.rs_body) {
                var value = {...data.rs_body.position_detail.map(item => item)};
                //console.log(value);
                sessionStorage.setItem("data_inqInterastaAccrued", JSON.stringify(value));
                window.open('/iiaSummary', '_self');
            } else {
                alert("error code : " + data.errors.map(error => error.error_code) + "\n"
                    + "error desc : " + data.errors.map(error => error.error_desc) + "\n"
                    + "error type : " + data.errors.map(error => error.error_type));
            }
        }).catch(error => console.log(error))
    };

    handleChange(event) {
        this.setState({ account: event.target.value });
    }

    render() {
        return (
            <div className="App">
                <DynamicHeader />
                <br />
                <h2>Form Input Inquiry Interest Accrued</h2>
                <br />
                <Col md={{ size: 6, offset: 4 }}>
                    <Form inline onSubmit={this.Clicked} >
                        <FormGroup className="mb-3 mr-sm-3 mb-sm-0">
                            <Label>Account Number : &nbsp;</Label>
                            <Input type="text" placeholder="Enter account number" onChange={this.handleChange} />
                        </FormGroup>
                        <Button color="primary" type="submit" >Submit</Button>
                    </Form>
                </Col>
            </div>
        );
    };
}

export default inquiryInterestComponent;