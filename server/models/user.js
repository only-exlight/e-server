let mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema,
    cryptoJS = require('crypto-js');

let schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    }
});

schema.methods.encryptPassword = function(password) {
    return cryptoJS.HmacSHA1(password, this.salt).toString();
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._plainPassword;
    });

schema.methods.checkPassowrd = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

exports.User = mongoose.model('User', schema);