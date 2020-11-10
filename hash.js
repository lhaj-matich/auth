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

const id = '1283d19dj19d3j8dd33';
const secretWord = 'supersecret';

const secretToken = 'eyJhbGciOiJIUzI1NiJ9.MTI4M2QxOWRqMTlkM2o4ZGQzMw.dbjuc_mOJMFMMYHl_nn5x3j2-zSS59kIkZ4_SUh5QJA';

const token = jwt.sign(id, secretWord);
const decodeToken = jwt.verify(secretToken, secretWord);
console.log(token);
console.log(decodeToken);


