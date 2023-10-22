// db.js - Database module

const mysql = require('mysql');

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'simonB2527',
  database: 'Local',
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Export a function to query the database
function query(sql, values, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      return callback(err);
    }

    connection.query(sql, values, (queryError, results) => {
      connection.release(); // Release the connection back to the pool

      callback(queryError, results);
    });
  });
}

module.exports = {
  query,
};
