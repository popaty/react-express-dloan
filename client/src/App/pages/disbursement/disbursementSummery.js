import React, {Component} from 'react';
import {Button,Alert,Col,Row} from 'reactstrap';
import DynamicHeader from '../Header.js';

class disbursementSummery extends Component {

    constructor(props){
        super(props);
        this.state = {

        };
    };

    openInqPositionDetail(){
        window.open('/ipdComponent', '_self');
    };

    render() {
        return(
            <div className="App">
                <DynamicHeader />
                <br />
                <Row>
                <Col  md={{ size: 4, offset: 4 }}>
                <Alert color="success"><h3>Success!!</h3>
                </Alert>
                </Col>
                </Row>
                 <br />
                 <Button color="success" onClick={this.openInqPositionDetail}>Inquiry Position Detail</Button>
            </div>
           );
       };
}

export default disbursementSummery;