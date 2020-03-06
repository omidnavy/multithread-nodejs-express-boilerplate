const express = require('express');
const path = require('path');
const fs = require('fs');
const dir = path.join(__dirname, './components');


module.exports = app => {
    try {
        let Controller, router, urlPath;
        //read all folders in "component" folder,1 by 1
        fs.readdirSync(dir).forEach(component => {
            const componentFile = path.join(dir, component, 'expressGateway.js');
            //if there is a file named "expressGateway.js"
            if (fs.existsSync(componentFile)) {
                //create a new router object
                router = express.Router();
                //require that "expressGateway" file, store it on "Controller" variable
                Controller = require(componentFile);
                //make sure our paths are all lowercase
                urlPath = component.toString().toLowerCase();
                //the path will be /api/[component]/[register routes on file] , like /api/settings/:id
                app.use("/api/" + urlPath, router);
                //call registerRoutes from expressGateway files with router object
                Controller.registerRoutes(router);
            }
        });
    }
    catch (e) {
        console.trace(e)
    }
};