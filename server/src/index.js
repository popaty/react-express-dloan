const api_helper = require("./API_helper");
const api_helper_post = require("./API_helper_post");
const headers = require("./Headers");

const express = require("express");
const app = express();
const path = require("path");
const PropertiesReader = require("properties-reader");
const properties = PropertiesReader("url-configuration.properties");

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Declare variable body for used body in method app.post, support json encoded bodies, support encoded bodies
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//get URL from property file
// var property1 = properties.get("openLoanAccount.url");

// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
    let list = ["item1", "item2", "item3"];
    res.json(list);
    console.log("Sent list of items");
});

//[GET] Inquiry Loan Account By Account No
app.get("/api/inqLoanAccount/:accountNo", (req, res) => {
    console.log("Inquiry Loan Account");
    let header = headers.get_headers();
    let url = properties.get("inqLoanAccount.url") + req.params.accountNo;
    api_helper.API_call_get(url, header)
        .then(response => {
            res.json(response);
            console.log("Finished Inquiry Loan Account");
        })
        .catch(error => {
            res.send(error)
        });
});

//[POST] Open Loan Account
app.post("/api/openLoanAccount", (req, res) => {
    console.log("Open Loan Account");
    let header = headers.get_headers();
    let url = properties.get("openLoanAccount.url");
    api_helper_post.API_call_post(url, header, req.body)
        .then(response => {
            res.json(response);
            console.log("Finished Open Loan Account");
        })
        .catch(error => {
            res.send(error)
        });
});

//[POST] Calculate Installment
app.post("/api/calculateInstallment", (req, res) => {
    console.log("Calculate Installment");
    let header = headers.get_headers();
    let url = properties.get("calculateInstallment.url");
    api_helper_post.API_call_post(url, header, req.body)
        .then(response => {
            res.json(response);
            console.log("Finished Calculate Installment");
        })
        .catch(error => {
            res.send(error)
        });
});

//[POST] Transaction Disbursement
app.post("/api/disbursement", (req, res) => {
    console.log("Disbursement");
    let header = headers.get_headers();
    let url = properties.get("disbursement.url");
    api_helper_post.API_call_post(url, header, req.body)
        .then(response => {
            res.json(response);
            console.log("Finished Disbursement");
        })
        .catch(error => {
            res.send(error)
        });
});

//[GET] pREST : Inquiry Position Detail
app.get("/api/inqPositionDetail/:accountNo", (req, res) => {
    console.log("Inquiry Position Detail");
    let header = headers.get_headers();
    let url = properties.get("inqPositionDetail.url") + req.params.accountNo;
    api_helper.API_call_get(url, header)
        .then(response => {
            res.json(response);
            console.log("Finished Inquiry Position Detail");
        })
        .catch(error => {
            res.send(error)
        });
});

//[GET] Inquiry Interest Accrued By Account No
app.get("/api/inqInterestAccrued/:accountNo", (req, res) => {
    console.log("Inquiry Interest Accrued");
    let header = headers.get_headers();
    let url = properties.get("inqInterestAccruedList.url") + req.params.accountNo;
    api_helper.API_call_get(url, header)
        .then(response => {
            res.json(response);
            console.log("Finished Inquiry Interest Accrued");
        })
        .catch(error => {
            res.send(error)
        });
});

//[POST] Inquiry Interest Accrued Details
app.post("/api/inqInterestAccruedDetail", (req, res) => {
    console.log("Inquiry Interest Accrued Detail");
    let header = headers.get_headers();
    let url = properties.get("inqInterestAccruedDetail.url");
    api_helper_post.API_call_post(url, header, req.body)
        .then(response => {
            res.json(response);
            console.log("Finished Inquiry Interest Accrued Detail");
        })
        .catch(error => {
            res.send(error)
        });
});

//[GET] Inquiry Position List
app.get("/api/inquiryPositionList/:accountNo", (req, res) => {
    console.log("Inquiry Position List");
    let header = headers.get_headers();
    let url = properties.get("inquiryPositionList.url") + req.params.accountNo;
    api_helper.API_call_get(url, header)
        .then(response => {
            res.json(response);
            console.log("Finished Inquiry Position List");
        })
        .catch(error => {
            res.send(error)
        });
});

//[GET] Inquiry Position Detail
app.get("/api/inquiryPositionDetail/:accountNo/:accountSequence", (req, res) => {
    console.log("Inquiry Position Detail");
    let header = headers.get_headers();
    let url = properties.get("inquiryPositionDetail.url") + req.params.accountNo +"/"+ req.params.accountSequence
    +"/"+ req.params.service;
    api_helper.API_call_get(url, header)
        .then(response => {
            res.json(response);
            console.log("Finished Inquiry Position Detail");
        })
        .catch(error => {
            res.send(error)
        });
});

//[POST] Repayment
app.post("/api/repayment", (req, res) => {
    console.log("Repayment");
    let header = headers.get_headers();
    let url = properties.get("repayment.url");
    api_helper_post.API_call_post(url, header, req.body)
        .then(response => {
            res.json(response);
            console.log("Finished Repayment");
        })
        .catch(error => {
            res.send(error)
        });
});

//[GET] Inquiry Accounting Record
app.get("/api/inquiryAccountingRecord/:accountNo/:accountSequence/:transactionDate/:channelPostDate/:jobID/:service", (req, res) => {
    console.log("Inquiry Accounting Record");
    let parameter = [];
    
    if(req.params.accountNo != "null"){
        parameter.push("account_number="+req.params.accountNo);
    }
    if(req.params.accountSequence != "null"){
         parameter.push("account_sequence="+ req.params.accountSequence);
    }
    if(req.params.transactionDate != "null"){
        parameter.push("transaction_date="+req.params.transactionDate);
    }
    if(req.params.channelPostDate != "null"){
        parameter.push("channel_post_date="+req.params.channelPostDate);
    }
    if(req.params.jobID != "null"){
        parameter.push("job_id="+req.params.jobID);
    }
    if(req.params.service != "null"){
        parameter.push("service="+req.params.service);
    }
    let header = headers.get_headers();
    let url = properties.get("inquiryAccountingRecord.url") + parameter.join("&").toString();
    console.log("url ="+url);
    api_helper.API_call_get(url, header)
        .then(response => {
            res.json(response);
            console.log("Finished Inquiry Accounting Record");
        })
        .catch(error => {
            res.send(error)
        });
});

// Handles any requests that don"t match the ones above
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

const port = 5000;
app.listen(port);

console.log("App is listening on port " + port);
