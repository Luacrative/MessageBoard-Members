const mongoose = require("mongoose"); 

const reply = new mongoose.Schema({  
    user: {type: mongoose.Schema.ObjectId, ref: "User", required: true},
    content: {type: String, required: true},
    date: {type: Date, required: true}
});

module.exports = mongoose.model("Reply", reply); 