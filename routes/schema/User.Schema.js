const Schema = require('mongoose').Schema;

exports.UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    
}, {
    collection: 'users'
})
