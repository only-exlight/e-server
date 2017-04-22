let mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

let schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name:String,
    surname:String,
    patronymic: String,
    birthday: Date,
    country:String,
    city: String,
    interests: Array,
    gender: Boolean,
    about: String,
    avatar:String
});

exports.Profile = mongoose.model('Profile',schema);