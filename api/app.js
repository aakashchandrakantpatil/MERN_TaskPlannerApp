const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const passport = require("passport");
const bodyParser = require('body-parser');


const routes = require('../api/routes/index');

require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("../authenticate");
require("./utils/connectdb");
require('dotenv').config();

//mongoose.connect('LINK TO BE ADDED');
const whitelist = process.env.WHITELISTED_DOMAINS ?
    process.env.WHITELISTED_DOMAINS.split(",") : [];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

// executes each middleware in sequence to the application
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
//app.use("/users", userRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('web-app/build'));
    const path = require("path");
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'web-app', 'build', 'index.html'));
    });
}

// attaches the routes to the app
routes(app);

module.exports = app;