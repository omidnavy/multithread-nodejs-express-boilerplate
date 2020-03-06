const {fork} = require('child_process');
const {join} = require('path');
const {fetchSettings} = require('../settings/fetch');
//spawn is a function we made to simplify our forking process;
const spawn = () => fork(join(__dirname, '../../../child-processes/api-server'));


async function run(express = null) {
    try {
        //if we have a running child process, remove event listeners
        if (express) {
            express.removeAllListeners('exit');
            express.removeAllListeners('error');
            express.removeAllListeners('message');
        }

        //wait 1 second and run child process

        //create a new promise and await for it to resolve
        //will resolve the return object from spawn when the timeout reaches
        express = await new Promise(resolve => setTimeout(() => resolve(spawn()), 1000));
        //add event listeners
        express.on('exit', () => run(express));
        express.on('error', () => run(express));
        express.on('message', message => handleMessage(express, message));
    }
    catch (e) {
        console.trace(e)
    }

}

//this is where the magic happens
async function handleMessage(express, message) { //[1]
    try {
        if (message.type !== 'request') return;
        let response = null;
        const {head, body} = message.data;
        switch (head) {
            case 'fetch-settings':
                response = await fetchSettings(body);
                break;
            default :
                response = {status: false, data: 404}
        }
        express.send({ //[2]
            type: 'response',
            data: response,
            uuid: message.id
        });
    }
    catch (e) {
        console.trace(e)
    }
}

// run recursive function
run();



