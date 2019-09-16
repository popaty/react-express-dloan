import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import DynamicHeader from '../Header.js';

class inqPositionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    }

    handleChange(event) {
        this.setState({account: event.target.value});
    }

    Clicked(event) {
        event.preventDefault()
        window.open('/ipdSummary', '_self');
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
export default inqPositionComponent;