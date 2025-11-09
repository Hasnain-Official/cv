const ENV = {
    LOCAL: 'local',
    PROD: 'prod',
    MASTER: 'master',
    SERVER: 'server',
    DEV: 'dev'
}

const STATUS_CODE = {
    SUCCESS: 200,
    CREATED: 201,
    NOTFOUND: 404,
    BADREQUEST: 400
}

const RESPONSE_DEFAULT_MESSAGE = 'Request processed successfully';
module.exports = {
    ENV,
    STATUS_CODE,
    RESPONSE_DEFAULT_MESSAGE
}