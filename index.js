const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const pg = require("pg");
let registration = require('./registration_number.js');
const app = express();
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgres://coder:pg123@localhost:5432/towns';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});
//factory function instance
let registrationInstance = registration(pool)
// configuring handlebars as middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
// initialise session middleware in which flash-express depends on it
app.use(session({
    secret: '<this is my long string that is used for session in http>',
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());
// built-in static middleware from ExpressJS to use static resources 
app.use(express.static('public'))

// My default Get route
app.get('/', async function (req, res, next) {
    try {
        // get all the reg numbers from the db
        let allReg = await registrationInstance.allTowns();



        res.render('home', {
            allReg
        });
    } catch (error) {
        next(error);
    } finally {
        console.log('finally')
    }
});

//post route
app.post('/clear', async function (req, res, next) {
    try {
        // let cleanTable = await pool.query('delete from registration_nubmers');
        // let clear = cleanTable.rows;
        await registrationInstance.clearRegistration();
        res.redirect('/');

    } catch (error) {
        next(error);
    }
});
app.post('/addPlate', async function (req, res, next) {
    try {
        //take registration number from the client side
        let addedPlate = req.body.textBox
        await registrationInstance.addRegistration(addedPlate);
        // await registrationInstance.filterBy(addedPlate);

        res.redirect('/');

    } catch (error) {
        next(error);
    } finally {
        console.log('finally');
    }

});
// app.get('/filters/:towns', async function (req, res, next) {
//     try {
//         let tags = req.params.towns
//         let filredReg = await registrationInstance.filterBy(tags);
//         res.render('home', {
//             filredReg
//         })

//     } catch (error) {
//         next(error);
//     } finally {
//         console.log('finally');
//     }
// });

const PORT = process.env.PORT || 3001

app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});