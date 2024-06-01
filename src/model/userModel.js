const dbConn = require("../../config/dbConfigure");


  // Method to create a user
  const createUser= async (username, email, password, contact, callback) => {
    dbConn.query('CALL kodie.usp_insert_tbl_sign_login(?, ?, ?, ?)', [username, email, password, contact], (error, results) => {
      if (error) {
        console.error('Error executing MySQL stored procedure:', error);
        return callback(error, null);
      }
      callback(null, results);
    });
  }


 
  const findByEmail = (email, callback) => {
    const sql = `SELECT * FROM kodie.tbl_sign_login WHERE email = ?`;
  
    dbConn.query(sql, [email], (err, results) => {
      if (err) {
        console.error('Error finding user by email:' + err.stack);
        callback(err, null);
        return;
      }
  
      if (results.length === 0) {
        callback(null, null); // No user found
        return;
      }
  
      callback(null, results[0]); // User found
    });
  };

  module.exports = {
    
    createUser,
    findByEmail
  };