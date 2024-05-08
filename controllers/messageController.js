const messageModel = require("../models/message");
const replyModel = require("../models/reply");

module.exports.get = async (req, res, next) => { 
    if (!req.user) {
        res.redirect("/login");
        return;
    }

    const message = await messageModel.findById(req.params.id);
    await message.populate("replies");

    res.render("message", {message, user: req.user});
};

module.exports.reply = async (req, res, next) => { 
    if (!req.user) {
        res.redirect("/login");
        return;
    }

    const reply = new replyModel({
        user: req.user,
        content: req.body.content,
        date: new Date()
    });

    await reply.save();

    const message = await messageModel.findById(req.params.id);
    message.replies.push(reply.id); 
    await message.save(); 

    res.redirect("messages");
};