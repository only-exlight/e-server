let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/edinomishlennik');

module.exports = mongoose;