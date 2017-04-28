let mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

let schema = new Schema({
    title: String,
    date: {
        type: Date,
        default: new Date()
    },
});

exports.Ivent = mongoose.model('Ivent',schema);