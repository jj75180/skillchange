const mysql = require('mysql');
const bcrypt = require('bcrypt'); 

function connectDatabase(host, user, password, database) {
    con = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });
    //console.log('connected to database successfully');
}


function generateRandomUserId(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   con.query('SELECT * FROM accounts WHERE Id = ?', [result], function(err, rows, fields) {
       if (err) throw err
       if (rows.length > 0) {
        generateRandomId(length)
       } else {
           return result
       }
   })
   return result;
}


function createAccount(username, password, email, ip, hash = integer, idLength = integer, table) {
    if (username.length > 0 && password.length > 0 && email.length > 0) {
    return new Promise((resolve, reject) => {
    var checksql = 'SELECT * FROM accounts WHERE username = ? OR email = ?';
    con.query(checksql, [username, email], function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            reject('username or email already exists in our system');
        } 
    })
    var id = generateRandomUserId(idLength)
    var hashed = bcrypt.hashSync(password, hash);
    var sql = "INSERT INTO " + table + " (username, password, email, id, ip) VALUES ('" + username + "', '" + hashed + "', '" + email + "', '" + id + "', '" + ip + "')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        resolve('account was created successfully');
    });
})
}
else {
    reject('username password and email cannot be blank!');
}

}

function login(username, password, table) {

    const sql = `SELECT * FROM ${table} WHERE username = '${username}' OR email = '${username}'`;
  
    return new Promise((resolve, reject) => {
  
      con.query(sql, function(err, result) {
        if (err) throw err;
        if (result.length > 0) {
  
          if (bcrypt.compareSync(password, result[0].password)) {
            let username = result[0].username;
            let message = `${username} logged in successfully`;
            resolve([message, username]);
          }
          else reject('incorrect username or password');
  
        }
        else reject('incorrect username or password');
  
        resolve(false)
      });
  
    });
  
  }

module.exports = {
    connectDatabase,
    createAccount,
    login
}