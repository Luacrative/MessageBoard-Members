const messageModel = require("../models/message");

module.exports.get = (req, res, next) => { 
    if (req.user)
        res.render("new-message");
    else
        res.redirect("login");
};

module.exports.post = (req, res, next) => { 
    if (!req.user) {
        res.redirect("login");
        return;
    }
    
    const message = new messageModel({
        user: req.user,
        title: req.body.title,
        content: req.body.content,
        date: new Date()
    });

    message.save();

    res.redirect("/home");
};