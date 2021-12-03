const mongoose = require("mongoose")
const JobSchema = require('../schema/Job.Schema').JobSchema

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
    return JobModel.create(job);
}

function getAllJobs() {
    return JobModel.find().exec();
}

function findJobByTitle(title) {
    return JobModel.find({"Title": {$regex: "/" + title + ".*/"}})
    .then((jobs) => {
        if (jobs.length) {
            return jobs;
        } else {
            const empty = [];
            return empty;
        }
    })
    .catch(err => {return err});
}

function findJobById(id) {
    return JobModel.findById(id);
}

function findJobByIdAndUpdate(id, job){
    return JobModel.findByIdAndUpdate(id, {...job});
}

// Make sure to export a function after you create it!
module.exports = {
    insertJob,
    getAllJobs,
    findJobByTitle,
    findJobById,
    findJobByIdAndUpdate,
};