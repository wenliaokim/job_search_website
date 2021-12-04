module.exports.whoisLoggedIn = (req, res, next) => {
    const username = req.session.username;
    if (!username) {
        res.status(401).send('Unauthorized: No user logged in. Please log in first');
    } else {
        req.username = username;
        next();
    }
}