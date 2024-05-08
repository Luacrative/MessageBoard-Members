// Dependencies 
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

require("dotenv").config();

// Initialize database 
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGO;
(async () => { 
    await mongoose.connect(mongoDB)
})().catch((err) => console.log(err));

// Initialize app 
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Initialize passport
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());

const users = require("./models/user");
passport.use(new LocalStrategy(async (username, password, done) => { 
    try {
        const user = await users.findOne({username: username});
        if (user) 
            if (await bcrypt.compare(password, user.password)) 
                return done(null, user);
            else 
                return done(null, false, {message: "Incorrect password"}); 

        return done(null, false, {message: "Incorrect username"});
    } catch (error) { 
        return done(error);
    }
}));

passport.serializeUser((user, done) => { 
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => { 
    const user = await users.findById(id); 
    done(null, user);
});

// Routes 
const homeRoute = require("./routes/home");
app.use("/home", homeRoute);
app.use("/", homeRoute);

const loginRoute = require("./routes/login");
app.use("/login", loginRoute);

const registerRoute = require("./routes/register");
app.use("/register", registerRoute);

const newMessageRoute = require("./routes/newMessage");
app.use("/new-message", newMessageRoute);

const messageRoute = require("./routes/message");
app.use("/messages", messageRoute);

module.exports = app;