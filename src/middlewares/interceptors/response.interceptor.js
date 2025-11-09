const { RESPONSE_DEFAULT_MESSAGE } = require("../../constants/constant");

exports.Validator = function responseInterceptor(req, res, next) {
    const oldJson = res.json;
    const oldSend = res.send;
    if(typeof oldSend === 'function') {
        res.send = generateResponseSend(req, res, oldSend);
    } else if(typeof oldJson === 'function') {
        res.json = generateResponseJson(req, res, oldJson);
    } 
    else {
        throw new Error(`Something's not right with response interceptor`);
    }
    next();
}

function generateResponseSend(req, res, oldSend) {
    return function(body) {
        const wrapped = JSON.stringify(handleResponse(req, res, body));
        return oldSend.call(this, wrapped);
    };
}

function generateResponseJson(req, res, oldJson) {
    return function(body) {
        const wrapped = handleResponse(req, res, body);
        return oldJson.call(this, wrapped);
    }
}

function handleResponse(req, res, body) {
    body = typeof body === 'object' ? body : JSON.parse(body);
    return {
        success: res.statusCode <= 400,
        statusCode: res.statusCode,
        message: body?.message || RESPONSE_DEFAULT_MESSAGE,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        data: body.data || body 
    };
}