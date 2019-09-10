import React, {Component} from 'react';

//import v001 from './v001.json';

class tampate extends Component {

    constructor(props){
        super(props);
        this.state = {

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        //this.setState({[event.target.name]:event.target.value});
        const {rq_body} = {...this.state};
        const currentState = rq_body;
        const interest = currentState.interest;
        const payment = currentState.payment;

        if (event.target.name === "interest_index" || event.target.name === "interest_spread") {
            interest[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
        } else if (event.target.name === "payment_frequency" || event.target.name === "payment_unit" ||
            event.target.name === "payment_date" || event.target.name === "billing_offset_day") {
            payment[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
        } else {
           currentState[event.target.name] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
       }
        this.setState({rq_body : currentState});
       
    }

    handleSubmit(event) {
        event.preventDefault()
        let body = {...this.state}
        let request = this.omitfield(body);
       console.log(request);
        // this.postList(request);
    }

    omitfield =(body) =>{
        for(let key in body.rq_body){
             if(typeof body.rq_body[key] === "object" ){   
              for(let subkey in body.rq_body[key]){
                    if(body.rq_body[key][subkey] === "" || body.rq_body[key][subkey] === 0){
                        delete body.rq_body[key][subkey];
                    }
              }
              if(Object.keys(body.rq_body[key]).length === 0){
                    delete body.rq_body[key];
                } 
             }else if(body.rq_body[key] === "" || body.rq_body[key] === 0){
                    delete body.rq_body[key];
             }
        }
        return body;
    }


    render() {
        return(
                 <h1>Do sumting...</h1>
           );
       }
}

export default tampate;