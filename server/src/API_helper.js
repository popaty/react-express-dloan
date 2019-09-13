const request = require('request');

module.exports = {
    API_call_get: function (url, header) {
        console.log(url);
        const options = {
            url: url,
            headers: JSON.stringify(header)
        };
        return new Promise((resolve, reject) => {
            console.log("header : " + JSON.stringify(header));
            request.get(options, function (err, resp, body) {
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
