let mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

let schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    dialogs: [
        {
            collocutor: {
                type: string,
                required: true
            },
            messages: [
                {
                    read: {
                        type: Boolean,
                        default: false
                    },
                    text: String,
                    date: {
                        type: Date,
                        default: new Date()
                    }
                }
            ]
        }
    ]
});

exports.Dialog = mongoose.model('Dialog',schema);