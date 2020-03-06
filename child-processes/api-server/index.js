//if the child process killed by "SIGKILL" , close this child process also.
//this is to make sure no zombie process remains
process.on('disconnect', () => process.exit());
//I like to use our "request" function as a global object,
// so we can have it all over our express application
const {request} = require('./components/request');
/**
 * @param req
 * @returns {Promise<Object>}
 */
global.request = request;

//initialize our express app
require('./init').init();


process.on('uncaughtException', function (e) {
    console.trace(e)
});