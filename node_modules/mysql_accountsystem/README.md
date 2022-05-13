# mysql accounts system

mysql accounts system is a node.js package that makes it easy to create accounts and login into them using mysql

## Installation



```bash
npm i mysql_accountsystem
```

## Usage
first thing first make the mysql database
```sql
CREATE DATABASE testDatabase
```
then create a table (this table can be edited in any way, just make sure to not change the names of the columns
```sql
USE testDatabase;
CREATE TABLE accounts (
`username` varchar(255),
`password` varchar(255),
`email` varchar(255),
`id` varchar(255),
`ip` varchar(255),
`creationDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
`lastUpdated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
now going to the javascript part

require the package
```javascript
const accountSystem = require('mysql_accountsystem')
```
connect to a mysql server
```javascript
//connect to a mysql database
accountSystem.connectDatabase('host', 'user', 'password', 'database', function(err) {
    if (err) throw err;
    console.log('connected to database successfully!')
})
```
create account function
```javascript
//create account
accountSystem.createAccount('username', 'password', 'mail', 'ip', passwordHash(int), idLength(int), 'databaseTable')
.then(message => createdSuccessfully(message))
.catch(message => createdUnSuccessfully(message))
function createdSuccessfully(message) {
        console.log(message)
        //actions if the account was created successfully
}
function createdUnSuccessfully(message) {
        console.log(message)
        //actions if there was an error creating the account
}
```
login function
```javascript
//login
//the function will check if either the username or the email is right
accountSystem.login('username', 'password', 'email', 'tableName')
.then(acceptedAccount)
.catch(unAcceptedAccount)
function acceptedAccount([message, username]) {
        console.log(message)
        //actions if username and password are right
}
function unAcceptedAccount(error) {
        console.log(error)
        //actions if username and password are wrong
}
```
## example using express
dependencies used:
- express (basic routing)
- express-session (saving global variables)
- body-parser (getting all data from frontend)
- ejs (passing variables to frontend)
- mysql_accountsystem (the whole accounting system)


importing basic packages and a few vars
```javascript
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const accountSystem = require('mysql_accountsystem')
const app = express()
const port = 80 
```
all of express's settings
```javascript
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
    }))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
```
connecting to the database using mysql accounts system
```javascript
accountSystem.connectDatabase('host', 'user', 'password', 'database', function(err) {
    if (err) throw err;
    console.log('connected to database successfully!')
})
```
basic routing
```javascript
app.get('/', (req, res) => {
    res.render('index', {message: ""})
})

app.get('/login', (req, res) => {
    res.render('login', {message: ""})
})

app.get('/dashboard', (req, res) => {
    if (req.session.loggedIn) {
    res.render('dashboard', {username: req.session.username})
    } else {
    res.redirect('/login', {message: 'You must be logged in to view this page!'})
    }
})
```
registration post, also using mysql accounts system
```javascript
//a post request to make an account
app.post('/register', (req, res) => {
    //get username password and email from frontend
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    //get the users ip from the request
    let ip = req.headers['x-forwarded-for']
    //create a new account using the createAccount function
    accountSystem.createAccount(username, password, email, ip, 10, 8, "accounts")
    .then(message => createdSuccessfully(message))
    .catch(message => createdUnSuccessfully(message))
    //things to run if the account is created successfully
    function createdSuccessfully(message) {
        console.log(message)
        //render login page and ask the user to log in
        res.render('login', {message: 'Account created successfully! please login'})
    }
    //things to run if the account is not created successfully
    function createdUnSuccessfully(message) {
        console.log(message)
        //render index with the error message
        res.render('index', {message: message})
    }
})
```
login post, again, using mysql accounts system
```javascript
//a post request to login
app.post('/login', (req, res) => {
    //get username and password from frontend
    let username = req.body.username;
    let password = req.body.password;

    //use the login function to check username and password
    accountSystem.login(username, password, "accounts")
    .then(acceptedAccount)
    .catch(unAcceptedAccount)
    //things to run if the account is accepted
    function acceptedAccount([message, username]) {
        console.log(message)
        //set session variables
        req.session.username = username
        req.session.loggedIn = true
        //render dashboard
        res.render('dashboard', {username: username})
    }
    //things to run if the account is not accepted
    function unAcceptedAccount(error) {
        console.log(error)
        //render login page with error message
        res.render('login', {message: 'Incorrect username or password!'})
    }
})
```
running the express server
```javascript
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
```
this is all basic usage and the full file is in the /example folder on the github page
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)