const api_helper = require('./API_helper');
const api_helper_post = require('./API_helper_post');
const express = require('express');
const path = require('path');
const app = express();
const uuidv4 = require('uuid/v4');

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('url-configuration.properties');
var dateFormat = require('dateformat');
var now = new Date();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Declare variable body for uesd body in method app.post, support json encoded bodies, support encoded bodies
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var property1 = properties.get('openLoanAccount.url');
// var property2 = properties.get('inqLoanAccount.url');
// console.log(property1);
// console.log(property2);


// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
	let list = ["item1", "item2", "item3"];
	res.json(list);
	console.log('Sent list of items');
});

app.get('/api/inqLoanAccount/:accountNo', (req, res) => {
	console.log('Inquiry Loan Account')
	console.log(req.params.accountNo);
	let header = {
		"x-request-id": uuidv4(),
		"x-job-id": "",
		"x-real-ip": "",
		"x-caller-service": "react-app",
		"x-caller-domain": "00",
		"x-device": "",
		"x-application": "react-app",
		"x-channel": "",
		"datetime": dateFormat(now, "yyyymmdd"),
		"accept": "application/json",
		"accept_language": "en",
		"accept_encoding": "UTF8",
		"Content-Type": "application/json",
	};
	let url = properties.get('inqLoanAccount.url') + req.params.accountNo;
	api_helper.API_call_get(url, header)
		.then(response => {
			res.json(response)
		})
		.catch(error => {
			res.send(error)
		})
});

app.post('/api/openLoanAccount', (req,res) => {
	console.log('Open Loan Account');
	console.log("body : "+JSON.stringify(req.body));
	let header = {
		"x-request-id": uuidv4(),
		"x-job-id": "",
		"x-real-ip": "",
		"x-caller-service": "react-app",
		"x-caller-domain": "00",
		"x-device": "",
		"x-application": "react-app",
		"x-channel": "",
		"datetime": dateFormat(now, "yyyymmdd"),
		"accept": "application/json",
		"accept_language": "en",
		"accept_encoding": "UTF8",
		"Content-Type": "application/json",
	};
	let url = properties.get('openLoanAccount.url')
	api_helper_post.API_call_post(url, header, req.body)
		.then(response => {
			res.json(response)
		})
		.catch(error => {
			res.send(error)
		});
	console.log('Finished Open Loan Account');
});

app.post('/api/calculateInstallment', (req,res) => {
	console.log('Calculate Installment Amount');
	console.log("body : "+JSON.stringify(req.body));
	let header = {
		"x-request-id": uuidv4(),
		"x-job-id": "",
		"x-real-ip": "",
		"x-caller-service": "react-app",
		"x-caller-domain": "00",
		"x-device": "",
		"x-application": "react-app",
		"x-channel": "",
		"datetime": dateFormat(now, "yyyymmdd"),
		"accept": "application/json",
		"accept_language": "en",
		"accept_encoding": "UTF8",
		"original-caller-domain":"B0",
		"Content-Type": "application/json",
	};
	let url = properties.get('calculateInstallment.url')
	api_helper_post.API_call_post(url, header, req.body)
		.then(response => {
			res.json(response)
		})
		.catch(error => {
			res.send(error)
		});
	console.log('Finished Calculate Installment Amount');
});


app.post('/api/disbursement', (req,res) => {
	console.log('Disbursement');
	console.log("body : "+JSON.stringify(req.body));
	let header = {
		"x-request-id": uuidv4(),
		"x-job-id": "",
		"x-real-ip": "",
		"x-caller-service": "react-app",
		"x-caller-domain": "00",
		"x-device": "",
		"x-application": "react-app",
		"x-channel": "",
		"datetime": dateFormat(now, "yyyymmdd"),
		"accept": "application/json",
		"accept_language": "en",
		"accept_encoding": "UTF8",
		"original-caller-domain":"B0",
		"Content-Type": "application/json",
	};
	let url = properties.get('disbursement.url')
	api_helper_post.API_call_post(url, header, req.body)
		.then(response => {
			res.json(response)
		})
		.catch(error => {
			res.send(error)
		});
	console.log('Finished Disbursement');
});


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
