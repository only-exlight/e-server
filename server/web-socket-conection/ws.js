const WebSocket = require('ws'),
    url = require('url'),
    server = require('../../main');
    wss = new WebSocket.Server({server}),
    addToContacts = require('../api/profile').addToContacts;
let Clients = [];

addToContacts.on('addToContacts', ()=>{
    console.log("Событие наступило");
})
wss.on('connection', (ws) => {
    console.log(Clients);
    Clients.push(ws);
    const location = url.parse(ws.upgradeReq.url, true);

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        ws.send(JSON.stringify({
            author: "sadsad",
            message: "kkkkk"
        }));
    });
});

module.exports = wss;