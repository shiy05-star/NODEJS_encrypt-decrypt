const userModel = require("../model/userModel");
const dbConn = require("../../config/dbConfigure");
const crypto = require('crypto');



const createUser = (req, res) => {
  const { username, email, password, contact } = req.body;

  if (!username || !email || !password || !contact) {
    return res.status(400).json({ message: 'Username, email, password, and contact are required.' });
  }

  const hashedPassword = hashPassword(password);

  function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${hash}:${salt}`;
  }

  userModel.createUser(username, email, hashedPassword, contact, (error, results) => {
    if (error) {
      console.error('Error executing MySQL stored procedure: ' + error.stack);
      return res.status(500).json({ message: 'Error inserting user with additional info.' });
    }

    const message = results[0][0].Message;

    res.status(201).json({ message });
  });
};

// const findOne = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;
  
//     const result = await userModel.findByUser(email, password);
//     console.log("hello");
//     if (result.length === 0) {
//       // If user not found
//       res.status(200).json({
//         success: true,
//         error: false,
//         message: 'User does not exist'
//       });console.log("123");
//     } else {
//       console.log("hello111");
//       // User found
//       if (result[0][0].result === "Email and password matched.") {
//         res.status(200).json({
//           success: true,
//           error: false,
//           message: 'Email and password matched.'
//         });console.log("222");
//       } else {
//         // Authentication successful
//         res.status(200).json({
//           success: true,
//           error: false,
//           data: result[0]
//         });
//       }
//     }

//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).json({
//       error: true,
//       success: false,
//       msg: 'Internal server error'
//     });
//   }
// }
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  const comparePassword = (password, hashedPassword) => {
    console.log(password);
    console.log(hashedPassword);
    const [storedHash, salt] = hashedPassword.split(':');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    console.log(hash);
    return storedHash === hash;
  };
  userModel.findByEmail(email, (error, user) => {
    if (error) {
      console.error('Error finding user: ' + error.stack);
      return res.status(500).json({ message: 'Error finding user.' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = comparePassword(password, user.password);
console.log(isPasswordValid);
console.log(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    res.status(200).json({ message: 'Login successful.' });
  });
};



module.exports = {
  createUser,
  loginUser
};
