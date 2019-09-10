import React, { Component } from 'react';
import {Button, Table,Col} from 'reactstrap';

class InquiryLoanAccountSummery extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.Clicked = this.Clicked.bind(this);
    }

    Clicked(){
        this.props.history.push('/');
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
        return(
            <div className="App">
            <br />
                <h2>Form Data Inquiry Account</h2>
            <br />
            <Col md={{ size: 6, offset: 3 }} >
              {this.dynamicResponse(data)}
            </Col>
               <Button color="primary" onClick={this.Clicked}>Home</Button>
                <br />
                <br /> 
            </div>
        )
    }
}

export default InquiryLoanAccountSummery;