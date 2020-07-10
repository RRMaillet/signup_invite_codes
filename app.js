'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const createError = require('http-errors');
const path = require('path');
const morgan = require('morgan');
const winston = require('./config');

const User = require('./models/user');



const indexRouter = require('./routes/index');
const secureRouter = require('./routes/secure');

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

app.use(morgan('combined', {
    stream: winston.stream
}));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/secure', secureRouter);



//CATCH 404 ERRORS
app.use((req, res, next) => {
    next(createError(404));
});

//ERROR HANDLER

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3001, () => {
    console.log(`Registration Demo App listening on Port 3001`)
});