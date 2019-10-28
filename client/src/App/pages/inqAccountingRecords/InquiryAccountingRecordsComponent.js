import React, {Component} from 'react';
import DynamicHeader from '../Header.js';
import inputModel from './model.json';
import utility from '../Utility.js';
import SpinnerLoader from '../loading.js';

class InquiryAccountingRecordsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account_number: "",
            account_sequence: 0,
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.Clicked = this.Clicked.bind(this);
    };


    componentDidMount() {
        if (JSON.parse(sessionStorage.getItem("account_number"))) {
            this.setState({ account_number: JSON.parse(sessionStorage.getItem("account_number")) });
        }
    }

}

export default InquiryAccountingRecordsComponent;