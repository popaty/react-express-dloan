import React, { Component } from 'react';
import {Button, Table,Col} from 'reactstrap';

class OpenLoanAccountSummary extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.Clicked = this.Clicked.bind(this);
    }

    Clicked(){
        this.props.history.push('/');
    }

    CallInquiryLoanAccount(){
        console.log(sessionStorage.getItem("account_number"));
        fetch('/api/inqLoanAccount/'+sessionStorage.getItem("account_number"), {
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.rs_body) {
                    sessionStorage.setItem("data", JSON.stringify(data.rs_body));
                    window.open('/ilaSummary', '_self');
                }else{
                    alert("error code : "+data.errors.map(error => error.error_code)+"\n"
                        +"error desc : "+ data.errors.map(error => error.error_desc));
                }

            }).catch(error => console.log(error))
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
    }

    render(){
        var data = JSON.parse(sessionStorage.getItem("data"));
        let account = data.account_number;
        return(
            <div className="App">
                <form>
                    <br />
                    <h2 align="center">Form Data Open Account</h2>
                    <br />
                    <Col md={{ size: 6, offset: 3 }} >
                        {this.dynamicResponse(data)}
                    </Col>
                    <br />
                    <Button color="primary" onClick={this.Clicked}>Home</Button><br /><br />
                    <Button color="primary" onClick={this.CallInquiryLoanAccount} >Inquiry Account Details : {account}</Button>
                </form>
            </div>
        )
    }
}

export default OpenLoanAccountSummary;
