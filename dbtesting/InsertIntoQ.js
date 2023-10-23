//use this to insert into queue
/**
 * 
 * const db = require('./dbmodule');

(function () {
    "use strict"
   //require Database module from dbmodule.js
    // this allows to not have to keep creating connections, is rather a global way to create a connection when needed and pass variables

    let GID = 1;
    let RHALL = 'Founders';
    window.addEventListener('load',Insert);

    
     * @param {String} RHALL
     * @param {Int}GID
     *
    function Insert(GID,RHALL){

      //fix to meet sql 
      const sql = 'INSERT INTO queues (ResHall,GroupID) VALUES(?,?);';
      const values = [GID,RHALL];
      db.query(sql,values, (error,results)=>{
          if (error) {
              throw error;
            }
            console.log('Query results:', results);
      });
  
      connection.end();
      }
  
    })();
 */


// everything above was trying to use a module and make things more compartmentalized
//easier to use but didnt seem to work

(function () {
  "use strict"

  let GID = 1;
  let RHALL = 'Founders';
  // the following creates a connection pool so we can just call the query func 
  //and send a query instead of manually making a new con everytime

  const mysql = require('mysql');
  const pool = mysql.createPool(dbConfig);

  // the config will have to change because its local only right now
  const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'simonB2527',
    database: 'Local',
  };

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

  window.addEventListener('load',Insert);

  /*
   * @param {String} RHALL
   * @param {Int}GID
   */

  function Insert(GID,RHALL){

    const sql = 'INSERT INTO queues (ResHall,GroupID) VALUES(?,?);';
    const values = [GID,RHALL];

    query(sql,values, (error,results)=>{
        if (error) {
            throw error;
          }
          console.log('Query results:', results);
    });
    
    }

  })();