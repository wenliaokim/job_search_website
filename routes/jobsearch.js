const express = require('express');
const router = express.Router();
const JobAccessor = require('./models/Job.Model');


// homepage search bar api 
router.post('/searchJobs', function(req, res) {
    const {Title} = req.body;

    /** 
    如果什么都没输入可以在前端搜索栏上方写出Enter a job title or location to start a search
    参考indeed.com
    if(!title) return res.status(422).send("You need to type something!")
    */
    console.log(Title);
    return JobAccessor.findJobByTitle(Title)
      .then(jobResponse => res.status(200).send(jobResponse))
      .catch(error => res.status(400).send(error))
})

// job details 
router.get('/searchJobs/JobDetail/:id', function(req, res) {
    const id = req.params.id;
    return JobAccessor.findJobById(id)
        .then(jobResponse => res.status(200).send(jobResponse)) // if length == 0, nothing found
        .catch(error => res.status(400).send(error))
})

// job edit 
router.put('/searchJobs/JobDetail/:id', function(req, res) {
    const id = req.params.id;
    return JobAccessor.findJobByIdAndUpdate(id, {...req.body})
        .then(jobResponse => res.status(200).send(jobResponse)) // if length == 0, nothing found
        .catch(error => res.status(400).send(error))
})

// create job 
router.post("/createJob", function(req, res) {
    const {Title, CompanyName, Location, JobDescription, EmployerEmail, Website} = req.body;
    
    if(!Title || !CompanyName || !Location || !JobDescription || !EmployerEmail) {
        return res.status(422).send("Missing Information");
    }

    return JobAccessor.insertJob(req.body)
            .then(jobResponse => res.status(200).send(jobResponse))
            .catch(error => res.status(400).send(error))

})


module.exports = router; 