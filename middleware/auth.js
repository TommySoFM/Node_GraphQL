const config = require("config")
const jwt = require("jsonwebtoken")

module.exports = function(req, res, next) {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if(!token) {return res.status(401).send("Access denied, no token provided.")};

    try {
        const decoded = jwt.verify(token, config.get("myprivatekey"));
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).send("Invalid token.");
    }
}