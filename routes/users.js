const express = require('express');
const router = express.Router();
const UserAccessor = require('./models/User.Model');
const Middleware = require('./middleware.js');
const bcrypt = require("bcryptjs");


router.post("/createUser", function(req, res) {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(422).send("Missing username: " + username + "or password:" + password)
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    return UserAccessor.insertUser(req.body)
            .then(userResponse => res.status(200).send(userResponse))
            .catch(error => res.status(400).send(error))

})

router.post("/login", function(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(422).send('Must include both password and username');
    }

    return UserAccessor.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                return res.status(404).send("No user found with that username");
            }
            if (bcrypt.compareSync(req.body.password, userResponse.password)) {

                req.session.username = username;
                
                return res.status(200).send({username}); // add a ifloggedin attribute return to frontend

                // return response.status(200).send("User is logged in!")
            } else {
                return res.status(404).send("Password Wrong!");
            }
        })
})

router.get("/logout", Middleware.whoisLoggedIn, function(req, res) {
    req.session.username = null;
    return res.status(200).send("Successfully logged out");
})

module.exports = router;
