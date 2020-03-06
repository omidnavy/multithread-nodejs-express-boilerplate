const {v4: uuid} = require('uuid');

function req() {
    //store a message by its uuid and callback in this constant
    const idToCallbackMap = {}; //[1]

    //if we receive a message (response) from parent, find its callback by uuid and let the handler do the rest
    process.on('message', function (message) { //[2]
        const handler = idToCallbackMap[message.uuid];
        if (handler) handler(message.data);
    });
    //this is our main request function which take the request and a callback for that request
    return function sendRequest(req, callback) { //[3]
        const correlationId = uuid();
        //store it in idToCallbackMap
        idToCallbackMap[correlationId] = callback;
        //send request to parent
        process.send({
            type: 'request',
            data: req,
            id: correlationId
        });
    };
}

//this will return "sendRequest" function to use;
const request = req();


//here we make the promise by the callback, so no callback hell :)
//we use this function to send all our requests to parent;
/**
 *
 * @param req
 * @returns {Promise<Object>}
 */
exports.request = function (req) {
    return new Promise(resolve => {
        request(req, function (res) {
            resolve(res);
        });
    })
};