const Schema = require('mongoose').Schema;

exports.JobSchema = new Schema({
    Title: String,
    CompanyName: String,
    Location: String,
    JobDescription: String,
    EmployerEmail: String,
    Website: String,
    PostingDate: Date,
// this explicitly declares what collection we're using
}, { collection : 'jobs' });