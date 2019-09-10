import React, { Component } from 'react';
import {Button, Table,Col} from 'reactstrap';
import DynamicHeader from '../Header.js';

class installmentSummary extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.opentDisbursement = this.opentDisbursement.bind(this);
    }

    getSessionStorage(){
        var data = JSON.parse(sessionStorage.getItem("data_installment"));
        return data;
    }

    opentDisbursement(){
        var data = this.getSessionStorage();
        sessionStorage.setItem("installment_amount", JSON.stringify(data.rs_body.installment_amount));
        window.open('/dbmComponent', '_self');
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
        var data = this.getSessionStorage();
        console.log(data);
        return(
                <div className="App">
                    <DynamicHeader />
                    <form>
                        <br />
                         <h2 >Form Data Calculate Installment Amount</h2>
                        <br />
                        <Col md={{ size: 6, offset: 3 }} >
                                {this.dynamicResponse(data.rs_body)}
                        </Col>
                        <br />
                        <Button color="success" onClick={this.opentDisbursement}>Disbursement</Button><br /> 
                    </form>
                </div>
        );
    }

}
export default installmentSummary;