let mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

let schema = new Schema({
    avatar: {
        type: String,
        default: "auto-project.jpg"
    },
    title: {
        type: String,
        required: true
    },
    initiator: String,
    desciption: String,
    participant: Array,
    target: String,
    interests: Array,
    type: String,
    date: Date,
    price: String
});

exports.Incident = mongoose.model('Incident',schema);