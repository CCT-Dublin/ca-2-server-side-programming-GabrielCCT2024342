var mysql = require("mysql2");


var db = mysql.createConnection({

    host: "localhost",
    database: "mysql_table",
    user: "root",
    password: "admin1234"

});

db.connect((err) => {
    if(err) {
        console.log("Database connection failed.", err)
    }else {
        console.log("Connected to Database")
    }
})

module.exports = db
