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
app.use(bodyParser.urlencoded({ extended: true }));

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
    let url = properties.get("inquiryPositionDetail.url") + req.params.accountNo + "/" + req.params.accountSequence;
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
app.get("/api/inquiryAccountingRecord/:accountNo/:accountSequence/:transactionDate/:channelPostDate/:jobID/:service/:transactionID", (req, res) => {
    console.log("Inquiry Accounting Record");
    let parameter = [];

    if (req.params.accountNo != "null") {
        parameter.push("account_number=" + req.params.accountNo);
    }
    if (req.params.accountSequence != "null") {
        parameter.push("account_sequence=" + req.params.accountSequence);
    }
    if (req.params.transactionDate != "null") {
        parameter.push("transaction_date=" + req.params.transactionDate);
    }
    if (req.params.channelPostDate != "null") {
        parameter.push("channel_post_date=" + req.params.channelPostDate);
    }
    if (req.params.jobID != "null") {
        parameter.push("job_id=" + req.params.jobID);
    }
    if (req.params.service != "null") {
        parameter.push("service=" + req.params.service);
    }
    if (req.params.transactionID != "null") {
        parameter.push("transaction_id=" + req.params.transactionID);
    }
    let header = headers.get_headers();
    let url = properties.get("inquiryAccountingRecord.url") + parameter.join("&").toString();
    console.log("url =" + url);
    api_helper.API_call_get(url, header)
        .then(response => {
            res.json(response);
            console.log("Finished Inquiry Accounting Record");
        })
        .catch(error => {
            res.send(error)
        });
});

//[GET] Inquiry Principal Reconciliation Result
app.get("/api/inquiryPrincipal/:acDate", (req, res) => {
    console.log("Inquiry Principal Reconciliation Result");
    let header = headers.get_headers();
    let url = properties.get("inquiryPrincipal.url") + req.params.acDate;
    console.log("url = " + url);
    api_helper.API_call_get(url, header)
        .then(response => {
            res.json(response);
            console.log("Finished Inquiry Principal Reconciliation Result");
        })
        .catch(error => {
            res.send(error)
        });
});

//[GET] Inquiry Interest Reconciliation Result
app.get("/api/inquiryInterest/:acDate", (req, res) => {
    console.log("Inquiry Interest Reconciliation Result");
    let header = headers.get_headers();
    let url = properties.get("inquiryInterest.url") + req.params.acDate;
    console.log("url = " + url);
    api_helper.API_call_get(url, header)
        .then(response => {
            res.json(response);
            console.log("Finished Inquiry Interest Reconciliation Result");
        })
        .catch(error => {
            res.send(error)
        });
});

//[GET] Inquiry Penalty Reconciliation Result
app.get("/api/inquiryPenalty/:acDate", (req, res) => {
    console.log("Inquiry Penalty Reconciliation Result");
    let header = headers.get_headers();
    let url = properties.get("inquiryPenalty.url") + req.params.acDate;
    console.log("url = " + url);
    api_helper.API_call_get(url, header)
        .then(response => {
            res.json(response);
            console.log("Finished Inquiry Penalty Reconciliation Result");
        })
        .catch(error => {
            res.send(error)
        });
});

//[GET] Inquiry GL Reconciliation
app.get("/api/inquiryGL/:acDate", (req, res) => {
    console.log("Inquiry GL Reconciliation");
    let header = headers.get_headers();
    let url = properties.get("inquiryGL.url") + req.params.acDate;
    console.log("url = " + url);
    api_helper.API_call_get(url, header)
        .then(response => {
            res.json(response);
            console.log("Finished Inquiry GL Reconciliation");
        })
        .catch(error => {
            res.send(error)
        });
});

//[POST] Calculate Installment Amount of Specific Product
app.post("/api/calculateInstallmentOfSpecific", (req, res) => {
    console.log("Calculate Installment Amount of Specific Product");
    let header = headers.get_headers();
    let url = properties.get("calculateInstallmentOfSpecific.url");
    api_helper_post.API_call_post(url, header, req.body)
        .then(response => {
            res.json(response);
            console.log("Finished Calculate Installment Amount of Specific Product");
        })
        .catch(error => {
            res.send(error)
        });
});


//[POST] Pre-Disbursement
app.post("/api/preDisbursement", (req, res) => {
    console.log("Pre-Disbursement");
    let header = headers.get_headers();
    let url = properties.get("preDisbursement.url");
    api_helper_post.API_call_post(url, header, req.body)
        .then(response => {
            res.json(response);
            console.log("Finished Pre-Disbursement");
        })
        .catch(error => {
            res.send(error)
        });
});

//[POST] Pre-Repayment
app.post("/api/pre-repayment", (req, res) => {
    console.log("Pre-Repayment");
    let header = headers.get_headers();
    let url = properties.get("pre-repayment.url");
    api_helper_post.API_call_post(url, header, req.body)
        .then(response => {
            res.json(response);
            console.log("Finished Pre-Repayment");
        })
        .catch(error => {
            res.send(error)
        });
});

//[POST] Pre-Repayment
app.post("/api/reverse", (req, res) => {
    console.log("Reverse Transaction");
    let header = headers.get_headers();
    let url = properties.get("reverse.url");
    api_helper_post.API_call_post(url, header, req.body)
        .then(response => {
            res.json(response);
            console.log("Finished Reverse Transaction");
        })
        .catch(error => {
            res.send(error)
        });
});

//[POST] Close Account
app.post("/api/close-account", (req, res) => {
    console.log("Close Account Transaction");
    let header = headers.get_headers();
    let url = properties.get("close-account.url");
    api_helper_post.API_call_post(url, header, req.body)
        .then(response => {
            res.json(response);
            console.log("Finished Close Account Transaction");
        })
        .catch(error => {
            res.send(error)
        });
});

//[GET] Inquiry Aggregate GL Outstanding
app.get("/api/inqAggregateGLOutstanding/:date/:currency/:cost_center/:business_area/:gl_account_number/:business_product", (req, res) => {
    let parameter = [];
    console.log("Inquiry Aggregate GL Outstandin");
    if (req.params.date != "null") {
        parameter.push(req.params.date);
    }
    if (req.params.currency != "null") {
        parameter.push(req.params.currency);
    }
    if (req.params.cost_center != "null") {
        parameter.push(req.params.cost_center);
    }
    if (req.params.business_area != "null") {
        parameter.push(req.params.business_area);
    }
    if (req.params.gl_account_number != "null") {
        parameter.push(req.params.gl_account_number);
    }
    if (req.params.business_product != "null") {
        parameter.push(req.params.business_product);
    }
    let header = headers.get_headers();
    let url = properties.get("inqAggregateGLOutstanding.url") + parameter.join("/").toString();
    console.log("url = " + url);
    api_helper.API_call_get(url, header)
        .then(response => {
            res.json(response);
            console.log("Finished Inquiry Aggregate GL Outstandin");
        })
        .catch(error => {
            res.send(error)
        });
});

//[POST] Repayment For Close
app.post("/api/repaymentForClose", (req, res) => {
    console.log("Repayment For Close");
    let header = headers.get_headers();
    let url = properties.get("repaymentForClose.url");
    api_helper_post.API_call_post(url, header, req.body)
        .then(response => {
            res.json(response);
            console.log("Finished Repayment For Close");
        })
        .catch(error => {
            res.send(error)
        });
});

//[POST] Calculate Installment Amount Options of Specific Account
app.post("/api/calculateInstallmentOfSpecificAccount", (req, res) => {
    console.log("Calculate Installment Amount Options of Specific Account");
    let header = headers.get_headers();
    let url = properties.get("calculateInstallmentOfSpecificAccount.url");
    api_helper_post.API_call_post(url, header, req.body)
        .then(response => {
            res.json(response);
            console.log("Finished Calculate Installment Amount Options of Specific Account");
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
