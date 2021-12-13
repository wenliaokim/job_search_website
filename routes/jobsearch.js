const express = require('express');
const router = express.Router();
const JobAccessor = require('./models/Job.Model');
const UserAccessor = require('./models/User.Model');
const Middleware = require('./middleware.js');

// homepage search bar api 
router.post('/searchJobs', function(req, res) {
    const {title} = req.body;

    return JobAccessor.findJobByTitle(title)
      .then(jobResponse => res.status(200).send(jobResponse))
      .catch(error => res.status(400).send(error))
})

// job details 
router.get('/searchJobs/JobDetail/:id', function(req, res) {
    const id = req.params.id;
    return JobAccessor.findJobById(id)
        .then((jobResponse) => {
            res.status(200).send({jobResponse: jobResponse, ifBelongToUser: true})
        }) 
        .catch(error => res.status(400).send(error))
})

// job edit 
router.put('/searchJobs/JobDetail/:id', Middleware.IsLoggedIn, function(req, res) {
    const username = req.session.username;
    const id = req.params.id;
    return JobAccessor.findJobById(id)
        .then(response => {
                if(response.username !== username) 
                    return res.status(400).send("You can't delete other's job.")
        })
        .then(()=> {
            JobAccessor.findJobByIdAndUpdate(id, {...req.body})
            .then((response) => res.status(200).send(response))
            .catch(error => res.status(400).send(error))
        })
        
        .catch(error => res.status(400).send(error))
})

router.delete('/searchJobs/JobDetail/:id', Middleware.IsLoggedIn, function(req, res) {
    const username = req.session.username;
    const id = req.params.id;
    return JobAccessor.findJobById(id)
        .then(response => {
            if(response.username !== username) 
                return res.status(400).send("You can't delete other's job.")
        })
        .then(() => {
            JobAccessor.findJobByIdAndDelete(id)
            .then((response) => res.status(200).send("Successfully deleted"))
        })
        .catch(error => res.status(400).send(error))
})

// create job 
router.post("/createJob", Middleware.IsLoggedIn, function(req, res) {
    // const username = req.session.username;
    const { title, companyName, location, jobDescription, employerEmail, website } = req.body;
    
    if(!title || !companyName || !location || !jobDescription || !employerEmail) {
        return res.status(422).send("Missing Information");
    }

    return JobAccessor.insertJob({...req.body})
            .then(jobResponse => res.status(200).send(jobResponse))
            .catch(error => res.status(400).send(error))
})


module.exports = router;