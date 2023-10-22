//use this to insert into queue
   "use strict"

   //require Database module from dbmodule.js
    // this allows to not have to keep creating connections, is rather a global way to create a connection when needed and pass variables
    const db = require('./dbmodule.js');

    function Insert(GID,RHALL){

    //fix to meet sql 
    const sql = 'INSERT INTO QUEUE (GID,RHALL) VALUES(?,?)';
    const values = [GID,RHALL];
    db.query(sql,values, (error,results)=>{
        if (error) {
            throw error;
          }
          console.log('Query results:', results);
    });

    connection.end();
    }



