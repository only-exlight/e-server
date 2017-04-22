let mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;
let jwt = require('jwt-simple'),
    secret = 'mysecretword';

let tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    }
});

tokenSchema.virtual("owner")
    .set(function(email){
        this._owner = email;
        this.token = jwt.encode({
            email: email,
            createdUTC: new Date().valueOf(),
            validity: 30 * 86400 + new Date().valueOf(),
        },secret);
    })
    .get(function(){
        return this._owner;
    });

exports.Token = mongoose.model('Token',tokenSchema);