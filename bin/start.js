'use Strict';  
 
require('@babel/register')
require('@babel/polyfill');
const http = require ('http');

// const app = require('../app').default;
const app = require('../src')
const server = http.createServer(app);

const config = require('../config')
console.log(process.env.Node_env);
const configvalue = config.get(process.env.Node_env);

const port = configvalue.PORTNO;

server.listen(process.env.PORT);

server.on('listening', ()=> {
   console.log(`Listening on ${process.env.PORT}`);
});
