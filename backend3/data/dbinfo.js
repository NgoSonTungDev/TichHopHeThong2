const mssql = require("mssql");

const SQL_DRIVER = "SQL Server";
const SQL_SERVER = "DESKTOP-CKB0OGA\\SQLEXPRESS";
const SQL_DATABASE = "ShareholderInfor";
const SQL_UID = "sa";
const SQL_PWD = "123456";

const config = {
  driver: SQL_DRIVER,
  server: SQL_SERVER,
  database: SQL_DATABASE,
  user: SQL_UID,
  password: SQL_PWD,
  option: {
    encrypt: false,
    enableArithAbort: false,
  },
  connectionTimeout: 300000,
  requestTimeout: 300000,
  pool: {
    idleTimeoutMillis: 300000,
    max: 100,
  },
};

const pool = new mssql.ConnectionPool(config)

module.exports={
    pool,
}
