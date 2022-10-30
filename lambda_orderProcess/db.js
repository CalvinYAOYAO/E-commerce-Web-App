var MySql = require("sync-mysql")

var connection = new MySql({
    host: "orderprocess.cgwd48j7gus4.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "password",
    database: "db"
});

module.exports = connection;