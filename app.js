const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();


// passpoer config
require('./config/passport')(passport)

// db config
const db = require('./config/keys').MongoURI;

// connect to Mongo
mongoose.connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB connected....'))
    .catch(err => console.log(err))

// handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');

// bodyparser middleware
app.use(express.urlencoded({
    extended: false
}));

// express-session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash 
app.use(flash());

// global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));