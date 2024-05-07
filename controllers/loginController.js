const passport = require("passport"); 

module.exports.get = (req, res, next) => { 
    res.render("login");
};

module.exports.post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
});