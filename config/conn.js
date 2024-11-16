const mysql = require("mysql2");

let connDB = () =>
{

    return  mysql.createConnection({
        host: "66.240.205.86",
        user: "root",
        database: "mas_promo",
        password: "Pum@1500123",
        port: 3306
    });

}

module.exports = connDB