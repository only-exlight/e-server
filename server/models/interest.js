let mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

let schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

exports.Interest = mongoose.model('Interest',schema);