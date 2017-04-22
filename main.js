let express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    app = express();

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

app.listen(8000,() => {
    console.log('Server started on port ' + 8000);
});
