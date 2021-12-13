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

router.post('/', function(req, res) {
    const { username } = req.body;
    return UserAccessor.findUserByUsername(username)
      .then(favResponse => res.status(200).send(favResponse.favorites))
      .catch(error => res.status(400).send(error))
})

router.post('/addFavorite', function(req, res) {
    const { fav, username } = req.body;
    return UserAccessor.findUserByUsernameThenAddFav(username, fav)
        .then((favResponse) => {
            favResponse.favorites.push(fav);
            favResponse.save();
        })
        .then(response => res.status(200).send(response))
        .catch(error => res.status(400).send(error));
})

router.delete('/deleteFavorite', Middleware.IsLoggedIn, function(req, res) {
    const username = req.username;
    const { fav } = req.body;
    if(fav.username !== username)
        return res.status(400).send("The username does not match.")
    return UserAccessor.findUserByUsername(username)
        .then( (favResponse) => {
            const index = favResponse.favorites.indexOf(fav._id);
            if(index !== -1) {
                favResponse.favorites.splice(index, 1);
                favResponse.save();
            }
        })
        .then(() => res.status(200).send("Successfully un-favorited!"))
        .catch(error => res.status(400).send(error));
})

router.post('/deleteFavorite', function(req, res) {
    const { fav, username } = req.body;
    return UserAccessor.findUserByUsername(username)
        .then( (favResponse ) => {
            const index = favResponse.favorites.indexOf(fav._id);
            if(index !== -1) {
                favResponse.favorites.splice(index, 1);
                favResponse.save();
            }
        })
        .then(() => res.status(200).send("Successfully un-favorited!"))
        .catch(error => res.status(400).send(error));
})


module.exports = router; 