// db.js - Database module

const mysql = require('mysql');

const dbConfig = {
  host: 'your-database-host',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database',
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
