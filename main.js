let express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    app = express();
const http = require('http');
const WebSocket = require('ws');
const url = require('url');

const server = http.createServer(app);

app.use(express.static(__dirname + '/client/dist'));

app.use(bodyParser.json({
	type: 'application/vnd.api+json'
})); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	'extended': 'true'
}));

app.use(bodyParser.urlencoded({ extended: false }))

app.get('*', (req, res) => {
  res.redirect('/');
});

app.use('/auth', require('./server/api/auth'));
app.use('/api', require('./server/api/profile'));
app.use('/api', require('./server/api/project'));
app.use('/api', require('./server/api/ivent'));
app.use('/api', require('./server/api/chats'));
app.use('/api', require('./server/api/search'));

const wss = new WebSocket.Server({ server });
let Clients = [];

wss.on('connection', (ws) => {
  console.log(Clients);
  Clients.push(ws);
  const location = url.parse(ws.upgradeReq.url, true);

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send(JSON.stringify({author : "sadsad", message:"kkkkk"}));
  });
});

server.listen(8000,() => {
    console.log('Server started on port ' + 8000);
});

