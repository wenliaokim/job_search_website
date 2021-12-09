const express = require('express');
const router = express.Router();
const UserAccessor = require('./models/User.Model');
const Middleware = require('./middleware.js');

router.get('/', Middleware.IsLoggedIn, function(req, res) {
    const username = req.username;
    return UserAccessor.findUserByUsername(username)
      .then(favResponse => res.status(200).send(favResponse.favorites))
      .catch(error => res.status(400).send(error))
})

router.post('/addFavorite', Middleware.IsLoggedIn, function(req, res) {
    const username = req.username;
    const {fav} = req.body;
    return UserAccessor.findUserByUsername(username)
        .then( (favResponse) => {
            favResponse.favorites.push(fav);
            res.status(200).send("Successfully favorited!");
        })
        .catch(error => res.status(400).send(error));
})

router.post('/deleteFavorite', Middleware.IsLoggedIn, function(req, res) {
    const username = req.username;
    const {fav} = req.body;
    return UserAccessor.findUserByUsername(username)
        .then( (favResponse) => {
            const index = favResponse.favorites.indexOf(fav);
            favResponse.favorites.splice(index, 1);
            res.status(200).send("Successfully un-favorited!");
        })
        .catch(error => res.status(400).send(error));
})


module.exports = router; 