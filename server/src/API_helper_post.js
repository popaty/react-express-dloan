const request = require('request');

module.exports = {
    API_call_post: function (url, header, body) {
        console.log(url);
        const options = {
            url: url,
            headers: header,
            body: JSON.stringify(body)
        };
        return new Promise((resolve, reject) => {
            console.log("request_header : " + JSON.stringify(header));
            console.log("request_body : " + JSON.stringify(body));
            request.post(options, function (err, resp, body) {
                if (err) {
                    //check for system error then modify data structure
                    let errMsg = {
                        errors: [
                            {
                                error_code: err.errno,
                                error_type: err.code,
                                error_desc: err.syscall
                            }
                        ]
                    };
                    console.log(err);
                    console.log(errMsg);
                    reject(errMsg);
                } else {
                    //send out data response
                    console.log("response_body : " + body);
                    resolve(JSON.parse(body));
                }
            })
        })
    }
};
