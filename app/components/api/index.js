const {fork} = require('child_process');
const {join} = require('path');
const {fetchSettings} = require('../settings/fetch');
//spawn is a function we made to simplify our forking process;
const spawn = () => fork(join(__dirname, '../../../child-processes/api-server'));
//its the returned object from fork
let express = spawn();

//rerun child process if closed or error after 5 seconds
express.on('exit', () => setTimeout(() => express = spawn(), 5000));
express.on('error', () => setTimeout(() => express = spawn(), 5000));
//this is where the magic happens
express.on('message', async function (message) { //[1]
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
});

