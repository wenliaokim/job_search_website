const express = require('express');
const router = express.Router();
const UserAccessor = require('./models/User.Model');
const Middleware = require('./middleware.js');
const bcrypt = require("bcryptjs");

router.post("/createUser", function(req, res) {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(422).send("Missing username: " + username + "or password:" + password)
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    return UserAccessor.insertUser(req.body)
        .then(userResponse => res.status(200).send({...userResponse}))
        .catch(error => res.status(400).send(error))
})

router.post("/login", function(req, res) {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(422).send('Must include both password and username');
    return UserAccessor.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse)
                return res.status(404).send("No user found with that username");
            if (bcrypt.compareSync(req.body.password, userResponse.password)) {
                return res.cookie('username', username, {httpOnly: true, sameSite: "none", secure: true})
                    .status(200).send({username});
            } else
                return res.status(404).send("Password Wrong!");
        })
})

router.get("/checkFav/:id", Middleware.IsLoggedIn, function(req, res) {
    const id = req.params.id;
    const username = req.cookies.username;
    return UserAccessor.findUserByUsername(username)
            .then(response => {
                const index = response.favorites.indexOf(id);
                if(index !== -1) {
                    res.status(200).send("liked");
                } else
                    res.status(200).send("unliked");
            })
            .catch(error => res.status(400).send(error))
})

router.post("/checkFav/", function(req, res) {
    const {jobId, username} = req.body;
    return UserAccessor.findUserByUsername(username)
            .then(response => {
                const index = response.favorites.indexOf(jobId);
                if(index !== -1) {
                    res.status(200).send("liked");
                }else
                    res.status(200).send("unliked");
            })
            .catch(error => res.status(400).send(error))
})

router.get("/logout", function(req, res) {
    return res.clearCookie('username').status(200).send("Successfully logged out");
})

module.exports = router;