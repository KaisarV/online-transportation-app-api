const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'online_driver',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = db;
