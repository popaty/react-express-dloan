const utility = {

    omit : (body) => {
        // eslint-disable-next-line
        for (let key in body.rq_body) {
            if (body.rq_body.hasOwnProperty(key)) {
                if (typeof body.rq_body[key] === "object") {
                    // eslint-disable-next-line
                    for (let subkey in body.rq_body[key]) {
                        if (body.rq_body[key].hasOwnProperty(subkey)) {
                            if (body.rq_body[key][subkey] === "" || body.rq_body[key][subkey] === 0) {
                                delete body.rq_body[key][subkey];
                            }
                        }
                    }
                    if (Object.keys(body.rq_body[key]).length === 0) {
                        delete body.rq_body[key];
                    }
                } else if (body.rq_body[key] === "" || body.rq_body[key] === 0) {
                    delete body.rq_body[key];
                }
            }
        }
        delete body.loading;
        return body;
    },
    clearSessionStorage : (key) => {
        return sessionStorage.removeItem(key);
    }
};

export default utility;