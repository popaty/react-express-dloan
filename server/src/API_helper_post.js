const request = require('request')

module.exports = {
    API_call_post : function(url, header, body){
        var options = {
            url: url,
            headers: JSON.stringify(header),
            body: JSON.stringify(body)
        };
        return new Promise((resolve, reject) => {
            console.log("header : "+JSON.stringify(header));
            console.log("body : "+JSON.stringify(body));
            request.post(options, function(err, resp, body) {
                if (err) {
                    reject(err);
                } else {
                    console.log("myBody : "+body);
                    resolve(JSON.parse(body));
                }
            })
        })
    }
};
