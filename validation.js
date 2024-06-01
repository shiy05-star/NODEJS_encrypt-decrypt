
// validation.js
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateUser
};






// const { validationResult} = require('express-validator');
// const errors = validationResult(req);
// let error={}
// const email_pattern = /^[^/#$%^^&**()]/
// const password_pattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$ /
//  if(values.email ===  ""){
//       error.email = "name should not be empty"
//  }
//  else if (!email_pattern.test(value.email)){
//     error.email = "email didn't match"
//  }else{
//     error.email = ""
//  }


//  if(values.password ===  ""){
//     error.password = "password should not be empty"
// }
// else if (!password_pattern.test(value.password)){
//   error.password = "password didn't match"
// }else{
//   error.password = ""
// }

// return errors;
