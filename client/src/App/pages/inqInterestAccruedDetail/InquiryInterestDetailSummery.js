import React, {Component} from 'react';
import {Col, Table} from 'reactstrap';
import DynamicHeader from '../Header.js';
import Row from "react-bootstrap/Row";

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

    dynamicResponse = (data) => {
        let table = [];
        let children = [];

        for(let key in data){
            if(typeof data[key] === "object"){
                let obj = [];
                for(let subdata in data[key]){
                    if(typeof data[key][subdata] === "boolean"){
                        var catchup = String(data[key][subdata] );
                        obj.push(<tr><td>{subdata}</td><td>{catchup}</td></tr>)
                    }else{
                        obj.push(<tr><td>{subdata}</td><td>{data[key][subdata]}</td></tr>);
                    }
                }
                children.push(<tr><td>{key+" : "}</td><td><Table>{obj}</Table></td></tr>);
            }else{
                children.push(<tr><td>{key}</td><td>{data[key]}</td></tr>);
            }
        }
        table.push(<Table bordered >{children}</Table>)
        return table;
    };

    render() {
        var data1 = JSON.parse(sessionStorage.getItem("data_inqPositionDetail"));
        var data2 = JSON.parse(sessionStorage.getItem("data_inqPositionDetail"));
        return(
            <div className="App">
                <DynamicHeader />
            <form>
                <br />
                 <h2 >Form Data Inquiry Interest Accrued Details</h2>
                <br />
                <Row>
                <Col md={{ size: 5, offset : 1 }} >
                    {this.dynamicResponse(data1)}
                </Col>
                <Col md={{ size: 5 }} >
                    {this.dynamicResponse(data2)}
                </Col>
                </Row>
                <br />
                {/* <Button color="secondary" onClick={this.Clicked}>Home</Button><br /><br /> */}
                {/* <Button color="primary" onClick={this.CallInquiryLoanAccount} >Inquiry Account Details : {account}</Button>  */}
            </form>
        </div>
           );
       }
}

export default inquiryPositionSummery;
