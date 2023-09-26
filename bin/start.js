// 'use Strict';  
 
// require('@babel/register')
// require('@babel/polyfill');
// const http = require ('http');

// // const app = require('../app').default;
// const app = require('../src')
// const server = http.createServer(app);

// const config = require('../config')
// console.log(process.env.Node_env);
// const configvalue = config.get(process.env.Node_env);

// console.log(configvalue,"configvalue");

// const port = configvalue.PORT;

// console.log(port,"port")

// server.listen(process.env.port);

// server.on('listening', ()=> {
//    console.log(`Listening on ${process.env.port}`);
// });
'use Strict';

require('@babel/register')
require('@babel/polyfill');
const http = require('http');

const app = require('../src'); // Assuming this is the path to your app
const server = http.createServer(app);

const config = require('../config');
const configvalue = config.get(process.env.Node_env);

console.log(configvalue, "configvalue");

const port = configvalue.PORT || 3000; // Defaulting to 3000 if PORT is not set in config

console.log(port, "port");

server.listen(port);

server.on('listening', () => {
  console.log(`Listening on ${port}`);
});
