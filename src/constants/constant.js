const ENV = {
    LOCAL: 'local',
    PROD: 'prod',
    MASTER: 'master',
    SERVER: 'server',
    DEV: 'dev'
}

const STATUSCODE = {
    SUCCESS: 200,
    CREATED: 201,
    NOTFOUND: 404,
    BADREQUEST: 400
}

module.exports = {
    ENV,
    STATUSCODE
}