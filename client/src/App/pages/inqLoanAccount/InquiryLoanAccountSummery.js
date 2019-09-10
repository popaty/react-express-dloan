import React, { Component } from 'react';
import {Button, Table,Col} from 'reactstrap';
import DynamicHeader from '../Header.js';

class InquiryLoanAccountSummery extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.opentInstallment = this.opentInstallment.bind(this);
    }

    getSessionStorage(){
        var data = JSON.parse(sessionStorage.getItem("data_inqLoanAccount"));
        return data;
    }

    // Clicked(){
    //     this.props.history.push('/');
    // }

    opentInstallment(){
        var data = this.getSessionStorage();
        sessionStorage.setItem("interest_rate", JSON.stringify(data.interest.interest_rate));
        sessionStorage.setItem("payment_frequency", JSON.stringify(data.payment.payment_frequency));
        sessionStorage.setItem("payment_unit", JSON.stringify(data.payment.payment_unit));
        window.open('/ciaComponent', '_self');
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
                            if (subdata === "balance" || subdata === "available_balance") {
                                obj.push(<tr class="text-primary"><td>{subdata}</td><td>{data[key][subdata]}</td></tr>);
                            } else {
                                obj.push(<tr ><td>{subdata}</td><td>{data[key][subdata]}</td></tr>);
                            } 
                        }
                     }
                     children.push(<tr><td>{key+" : "}</td><td><Table borderless>{obj}</Table></td></tr>);
                }else{
                    children.push(<tr><td>{key}</td><td>{data[key]}</td></tr>);
                }
            }
            table.push(<Table bordered>{children}</Table>)
        return table;
    }

    render(){
        var data = this.getSessionStorage();
        console.log(data);
        return(

            <div className="App">
                <DynamicHeader />
            <br />
                <h2>Form Data Inquiry Account</h2>
            <br />
            <Col md={{ size: 6, offset: 3 }} >
              {this.dynamicResponse(data)}
            </Col>
            <br />
               {/* <Button color="secondary" onClick={this.Clicked}>Home</Button>&emsp;&emsp;  */}
               <Button color="success" onClick={this.opentInstallment}>Calculate Installment Amount</Button>
                <br />
                <br /> 
                <br /> 
            </div>
        )
    }
}

export default InquiryLoanAccountSummery;