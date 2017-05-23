let mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

let schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    interest: Array,
    participant: Array
});

exports.Chat = mongoose.model('Chat',schema);