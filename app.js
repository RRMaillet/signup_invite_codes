'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const createError = require('http-errors');

const User = require('./models/user');
const InviteCode = require('./models/invite_code');


const indexRouter = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/sean_reg_demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'Connection Error!'));
db.once('open', () => {
    console.log(`We're connected!`);
});


app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(session({
    secret: 'This is the Secret for this demo',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// SET LOCAL VARIABLES

app.use((req, res, next) => {
    res.locals.title = 'Registration Demo w/Validation Code';
    res.locals.success = req.session.success || '';
    delete req.session.success;
    res.locals.failure = req.session.error;
    delete req.session.error;
    next();
});

//MOUNT ROUTES

app.use('/', indexRouter);

//CATCH 404 ERRORS
app.use((req, res, next) => {
    next(createError(404));
});

//ERROR HANDLER

app.use(function (err, req, res, next) {
    req.session.error = err.message;
    res.redirect('back');
});

app.listen(3001, () => {
    console.log(`Registration Demo App listening on Port 3001`)
});