const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const {Conection} = require("mysql2");

dotenv.config();

const conection = mysql.createPool({
    host: precess.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

module.exports = conection;