let mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

let schema = new Schema({
    title: String,
    initiator: {
        type: String,
        required: true
    },
    desciption: String,
    intereses: Array,
    participant: Array,
    target: String
});

exports.Project = mongoose.model('Project',schema);