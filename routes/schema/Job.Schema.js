const Schema = require('mongoose').Schema;

exports.JobSchema = new Schema({
    iconUrl: String,
    username: String,
    title: String,
    companyName: String,
    location: String,
    jobDescription: String,
    employerEmail: String,
    website: String,
    postingDate: {
        type: Date,
        default: Date.now,
    }
// this explicitly declares what collection we're using
}, { collection : 'jobs' });