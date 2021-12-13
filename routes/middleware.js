module.exports.IsLoggedIn = (req, res, next) => {
    const username = req.cookies.username;
    if(!username) {
        res.status(404).send("You are not logged in.");
    } else {
        req.username = username;
        next();
    }
}