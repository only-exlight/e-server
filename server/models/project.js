let mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

let schema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    initiator: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: "auto-project.jpg"
    },
    desciption: String,
    interests: Array,
    participant: Array,
    target: String
});

exports.Project = mongoose.model('Project',schema);