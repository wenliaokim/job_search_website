const express = require('express');
const router = express.Router();
const UserAccessor = require('./models/User.Model');
//const jwt = require('jsonwebtoken');

router.post("/createUser", function(req, res) {
    const {username, password} = req.body
    
    return UserAccessor.insertUser(req.body)
            .then(userResponse => res.status(200).send(userResponse))
            .catch(error => res.status(400).send(error))

})

module.exports = router;