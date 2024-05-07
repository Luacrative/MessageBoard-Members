const messageModel = require("../models/message");

module.exports = async (req, res, next) => { 
    const messages = await messageModel.find();

    res.render("home", {messages});
};