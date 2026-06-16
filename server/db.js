const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2006",
  database: "blog_db",
});

connection.connect((err) => {
  if (err) {
    console.log("MySQL connection failed");
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = connection;
