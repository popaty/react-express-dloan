import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import DynamicHeader from '../Header.js';

class inquiryInterestComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            account: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    }

    Clicked(event) {
        event.preventDefault()
        window.open('/iiaSummary', '_self');
    }

    handleChange(event) {
        this.setState({account : event.target.value});
    }

    render() {
        return(
            <div className = "App">
                <DynamicHeader />
            <br />
              <h2>Form Input Inquiry Interest Accrued</h2>
                <br />
                  <Col md={{ size: 6, offset: 4 }}> 
                  <Form inline onSubmit={this.Clicked} >
                      <FormGroup className="mb-3 mr-sm-3 mb-sm-0">
                        <Label>Example : &nbsp;</Label>
                        <Input type="text" placeholder="Enter Example" onChange={this.handleChange} />
                         </FormGroup>
                         <Button color="primary" type="submit" >Submit</Button>
                  </Form>
                  </Col>
          </div>
           );
       }
}

export default inquiryInterestComponent;