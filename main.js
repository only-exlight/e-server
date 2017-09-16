const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    server = http.createServer(app);

app.use(express.static(__dirname + '/web-client'));
app.use(express.static(__dirname + '/storage'));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use('/auth', require('./server/api/auth'));
app.use('/api', require('./server/api/profile'));
app.use('/api', require('./server/api/project'));
app.use('/api', require('./server/api/ivent'));
app.use('/api', require('./server/api/chats'));
app.use('/api', require('./server/api/search'));
app.use('/api', require('./server/api/incident'));

app.get('*', (req,res)=>res.sendfile('./client/dist/index.html'))

server.listen(8000, () => {
    console.log('Server started on port ' + 8000);
});

module.exports = server;
require('./server/web-socket-conection/ws');
