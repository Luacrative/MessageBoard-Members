// Dependencies 
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

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
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());

const users = require("./models/user");
passport.use(new LocalStrategy(async (username, password, done) => { 
    const user = await users.findOne({username: username});
    if (user) 
        if (user.password == password)
            done(null, user);
        else 
            done(null, false, {message: "Incorrect password"}); 

    done(null, false, {message: "Incorrect username"});
}));

passport.serializeUser((user, done) => { 
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => { 
    const user = await users.findById(id); 
    done(null, user);
});

// Routes 
const homeRoute = require("./routes/login");
app.use("/home", homeRoute);
app.use("/", homeRoute);

const loginRoute = require("./routes/login");
app.use("/login", loginRoute);

const registerRoute = require("./routes/register");
app.use("/register", registerRoute);

module.exports = app;