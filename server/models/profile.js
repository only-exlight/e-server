let mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

let schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        default:"",
        type: String
    },
    surname: {
        default:"",
        type: String
    },
    patronymic: {
        default:"",
        type: String
    },
    birthday: Date,
    country: {
        default:"",
        type: String
    },
    city: {
        default:"",
        type: String
    },
    phone: {
        default:"",
        type: String
    },
    interests: Array,
    gender: {
        default: true,
        type: Boolean
    },
    about: {
        default:"",
        type: String
    },
    avatar:{
        default:"auto.jpg",
        type: String
    },
    contacts: [
        {
            email : {
                type: String,
                require: true
            },
            status : {
                type: Boolean,
                require: true,
                default: false
            }
        }
    ]
});

exports.Profile = mongoose.model('Profile',schema);