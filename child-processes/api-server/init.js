const express = require('express');
const http = require('http');
const RouteMapper = require('./RouteMapper');
const port = 3000;


exports.init = function () {
    try {
        const app = express();
        const server = http.createServer(app);

        //apply route-mapper, all routing logic goes here
        RouteMapper(app);
        /*  Default 404 Route */
        app.use((req, res) => res.status(404).send('Not found'));
        server.listen(port);
        console.log(`Server started on localhost:${port}`)
    }
    catch (e) {
        console.trace(e)
    }
};

