const bcrypt = require('bcrypt');
const {MD5} = require('crypto-js');
const jwt = require('jsonwebtoken');

// Hashing Passwords

// bcrypt.genSalt(10,(err, salt) => {
//     if (err) return next(err);
//     bcrypt.hash('password123',salt, (err, hash) => {
//         if (err) return next(err);
//         console.log(hash);
//     })
// })


const secretWord = process.env.S_WORD;

const secretToken = process.env.S_TOKEN;

const token = jwt.sign(id, secretWord);
const decodeToken = jwt.verify(secretToken, secretWord);

