import React, {Component} from 'react';
import {Col} from 'reactstrap';
import DynamicHeader from '../Header.js';

class inquiryPositionSummery extends Component {

    constructor(props){
        super(props);
        this.state = {
            account: ""
        };
        this.handleChange = this.handleChange.bind(this);
        // this.Clicked = this.Clicked.bind(this);
    }

    Clicked(event) {
        event.preventDefault()
        // this.props.history.push('/');
    }

    handleChange(event) {
        this.setState({account : event.target.value});
    }

    render() {
        return(
            <div className="App">
                <DynamicHeader />
            <form>
                <br />
                 <h2 >Form Data Inquiry Interest Accrued</h2>
                <br />
                <Col md={{ size: 6, offset: 3 }} >
                </Col>
                <br />
                {/* <Button color="secondary" onClick={this.Clicked}>Home</Button><br /><br /> */}
                {/* <Button color="primary" onClick={this.CallInquiryLoanAccount} >Inquiry Account Details : {account}</Button>  */}
            </form>
        </div>
           );
       }
}

export default inquiryPositionSummery;