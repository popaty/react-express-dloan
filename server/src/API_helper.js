const request = require('request')

module.exports = {
    API_call_get : function(url, header){
        console.log(url);
        var options = {
            url: url,
            headers: JSON.stringify(header)
        };
        return new Promise((resolve, reject) => {
            request.get(options, function(err, resp, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(body));
                }
            })
        })
    }
};
