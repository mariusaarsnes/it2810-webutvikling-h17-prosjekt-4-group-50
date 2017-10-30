exports.findUser = (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.send("You are not logged in!");
    }
};