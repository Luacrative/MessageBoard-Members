const mongoose = require("mongoose"); 

const message = new mongoose.Schema({  
    user: {type: mongoose.Schema.ObjectId, ref: "User", required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, required: true}
});

module.exports = mongoose.model("Message", message); 