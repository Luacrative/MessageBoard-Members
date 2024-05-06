const bcrypt = require("bcrypt");
const userModel = require("../models/user");

module.exports.get = (req, res, next) => { 
    res.render("register");
};

module.exports.post = async (req, res, next) => { 
    const existingUser = await userModel.findOne({username: req.body.username});
    if (existingUser) { 
        res.redirect("/login");
        return; 
    } 

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new userModel({
            username: req.body.username,
            password: hashedPassword, 
        });

        newUser.save(); 
        res.redirect("/login"); 
    } catch {
        res.redirect("/register"); 
    }
};