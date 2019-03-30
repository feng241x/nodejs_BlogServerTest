const http = require('http');

const PROT = 8000;

const serverHandle = require('../app');

http.createServer(serverHandle)
    .listen(PROT);