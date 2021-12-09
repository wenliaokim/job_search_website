//const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
//const JobSchema = require('./Job.Schema.js')
//const Job = mongoose.model("Job", JobSchema);

exports.UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },

    password: {
        type: String,
    },

    favorites: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Job'
        }
    ]
}, {collection: 'users'})
