const express = require('express');
const router = express.Router();
const JobAccessor = require('./models/Job.Model');



router.post('/searchJobs', function(req, res) {
    const {title} = req.body;

    /** 
    如果什么都没输入可以在前端搜索栏上方写出Enter a job title or location to start a search
    参考indeed.com
    if(!title) return res.status(422).send("You need to type something!")
    */

    return JobAccessor.findJobByTitle(title)
      .then(jobResponse => res.status(200).send(jobResponse))
      .catch(error => res.status(400).send(error))
})


router.get('/searchJobs/JobDetail/:id', function(req, res) {
    const id = req.params.id;
    return JobAccessor.findJobById(id)
        .then(jobResponse => res.status(200).send(jobResponse)) // if length == 0, nothing found
        .catch(error => res.status(400).send(error))
})


router.put('/searchJobs/JobDetail/:id', function(req, res) {
    const id = req.params.id;
    return JobAccessor.findJobByIdAndUpdate(id, {...req.body})
        .then(jobResponse => res.status(200).send(jobResponse)) // if length == 0, nothing found
        .catch(error => res.status(400).send(error))
})

router.post("/createJob", function(req, res) {
    const {Title, CompanyName, Location, JobDescription, EmployerEmail, Website, PostingDate} = req.body;
    if(!Title || !CompanyName || !Location || !JobDescription || !EmployerEmail || !PostingDate) {
        return res.status(422).send("Missing Information");
    }

    // postingdate date? or string
    return JobAccessor.findJobByTitle(Title)
        .then((jobResponse) => {
            if(jobResponse.length) {
                if(jobResponse.Title === Title && jobResponse.CompanyName === CompanyName 
                && jobResponse.Location === Location && jobResponse.JobDescription === JobDescription 
                && jobResponse.EmployerEmail === EmployerEmail
                && jobResponse.PostingDate.getTime() === PostingDate.getTime()) {
                    return res.status(402).send("Job already exists")
                }
            }

            JobAccessor.insertJob(req.body)
            .then(jobResponse => res.status(200).send(jobResponse))
            .catch(error => res.status(400).send(error))

        })
        .catch(error => res.status(400).send(error))
})


module.exports = router; 