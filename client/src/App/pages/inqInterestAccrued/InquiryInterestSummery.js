import React, {Component} from 'react';
import { Button, Col,Table} from 'reactstrap';
import DynamicHeader from '../Header.js';

class inquiryPositionSummery extends Component {

    constructor(props){
        super(props);
        this.state = {
       
        };
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

    render() {
        var data = JSON.parse(sessionStorage.getItem("data_inqInterastaAccrued"));
        console.log(data);
        return(
            <div className="App">
                <DynamicHeader />
                <form>
                    <br />
                    <h2 >Form Data Inquiry Position Detail</h2>
                    <br />
                    <Col md={{ size: 6, offset: 3 }} >
                      {this.dynamicResponse(data.position_detail)}
                    </Col>
                    <br />
                    {/* <Button color="success" onClick={this.Clicked}>Inquiry Interest Accrued</Button><br /><br /> */}
                    {/* <Button color="success" onClick={this.CallInquiryLoanAccount} >Inquiry Account Details </Button> */}
                </form>
            </div>
        );
    }
}

export default inquiryPositionSummery;
