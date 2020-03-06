//this will run our express server as child process
require('./components/api');

//I always like to handle "uncaughtException" , this will make our app more stable
process.on('uncaughtException', function (e) {
    //nothing serious right now
    console.trace(e)
});

