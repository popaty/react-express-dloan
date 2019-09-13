const uuidv4 = require('uuid/v4');

module.exports = {
    get_headers: function () {
        const dateFormat = require('dateformat');
        const now = new Date();
        return {
            "x-request-id": uuidv4(),
            "x-job-id": uuidv4(),
            "x-real-ip": "x.x.x.x",
            "x-caller-service": "react-app",
            "x-caller-domain": "00",
            "x-device": "react-app",
            "x-application": "react-app",
            "x-channel": "react-app",
            "datetime": dateFormat(now, "yyyymmdd"),
            "accept": "application/json",
            "accept_language": "en",
            "accept_encoding": "UTF8",
            "original-caller-domain": "B0",
            "Content-Type": "application/json",
        };
    }
};
