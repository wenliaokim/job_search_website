module.exports.whoisLoggedIn = (req, res, next) => {
    const username = req.session.username;
    if (username) {
        req.username = username;
        next();
    }
}

module.exports.IsLoggedIn = (req, res, next) => {
    const username = req.session.username;
    if(!username) {
        res.status(404).send("You are not logged in.");
    } else {
        req.username = username;
        next();
    }
}