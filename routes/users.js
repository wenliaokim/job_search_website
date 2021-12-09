const express = require('express');
const router = express.Router();
const UserAccessor = require('./models/User.Model');
//const jwt = require('jsonwebtoken');

router.post("/createUser", function(req, res) {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(422).send("Missing username: " + username + "or password:" + password)
    }

    return UserAccessor.insertUser(req.body)
            .then(userResponse => res.status(200).send(userResponse))
            .catch(error => res.status(400).send(error))
})

router.post("/authenticate", function(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(422).send('Must include both password and username');
    }

    return UserAccessor.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                return res.status(404).send("No user found with that username");
            }
            if (userResponse.password === password) {

                req.session.username = username;
                return res.status(200).send({username});

                // return response.status(200).send("User is logged in!")
            } else {
                return res.status(404).send("Password Wrong!");
            }
        })


})

module.exports = router;