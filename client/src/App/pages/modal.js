import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Table} from 'reactstrap';
import fieldHeader from './inqAccountingRecords/fieldRes'

class ModalExample extends Component {
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    getHeaderTable = () => {
        let header = [];
        header.push(<th>#&nbsp;</th>);
        fieldHeader.gl_entry_list.map(item => {
            if (item === "trnRef" || item === "before_balance" || item === "first_payment_date"
                || item === "installment_amount" || item === "number_of_payment" ||
                item === "interest_index" || item === "interest_spread") {
                header.push(<th><u>{item}</u>&nbsp;</th>);
            } else {
                header.push(<th>{item}&nbsp;</th>);
            }
        })
        return header;
    };

    getBodyTable = () => {
        let data = this.props.data
        let body = [];
        // eslint-disable-next-line
        for (let index in data) {
            let num = Number(index) + 1;
            let obj = [];
            obj.push(<td>{num}</td>);
            let value = this.getFieldHeader();
            if (data.hasOwnProperty(index)) {
                // eslint-disable-next-line
                for (let ResHeader in data[index]) {
                    if (typeof data[index][ResHeader] === "object") {
                        // eslint-disable-next-line
                        for (let inObj in data[index][ResHeader]) {
                            // eslint-disable-next-line
                            for (let keyInObj in data[index][ResHeader][inObj]) {
                                value[keyInObj] = data[index][ResHeader][inObj][keyInObj];
                            }
                        }
                    } else {
                        value[ResHeader] = data[index][ResHeader];
                    }
                }
                // eslint-disable-next-line
                for (let indexValue in value) {
                    if(indexValue === "job_id" || indexValue === "transaction_id" ){
                        obj.push(<td>{value[indexValue]}</td>);
                    }else{
                        obj.push(<td>{value[indexValue]}</td>);
                    }
                }
                body.push(<tr>{obj}</tr>);
            }
        }
        return body;
    };

    getFieldHeader = () => {
        let key = {};
        fieldHeader.gl_entry_list.map(item => {
            key[item] = "";
        })
        return key;
    };

    render() {
        if (!this.props.show) {
          return null;
        }
        return (
            <div> 
                <Modal size="lg" isOpen={this.props.show} >
                    <ModalHeader toggle={this.onClose}>Form Data Inquiry Accounting Record</ModalHeader>
                    <ModalBody>
                        <div class="table-responsive" style={{ marginBottom: 15 , marginTop: 10}} >
                                <Table bordered >
                                    <thead>
                                        <tr>
                                            {this.getHeaderTable()}
                                        </tr>
                                    </thead>
                                     <tbody>
                                        {this.getBodyTable()}
                                    </tbody>
                                </Table>
                                <div>
                                </div>
                            </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
};

export default ModalExample;