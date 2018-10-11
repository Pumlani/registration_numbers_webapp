//import modules
const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const registration_number = require('./registration_number.js');
const app = express();

const registrationInstance = registration_number();

app.use(express.static('public'))
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.get('/', async function (req, res, next) {

    res.render('home', {
        registrationNo: await registrationInstance.addRegistration()
    });
});

app.post('/reg_numbers:textBox', async function (req, res, next) {
    try {
        let registration = req.body.textBox
        if (registration === "" || registration !== 'CA' || registration !== 'CY' || registration !== 'CJ' || registration !== 'CF') {

            req.flash('info', 'Please enter a valid registration!')
        }
        s
        res.redirect('/')
    } catch (error) {
        next(error);
    }
});


const PORT = process.env.PORT || 3011

app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});