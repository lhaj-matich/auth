const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true, 
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    token: {
        type: String
    }
})

userSchema.pre('save', function(next) {
    let user = this;

    if (user.isModified('password')){
        bcrypt.genSalt(SALT_I, (err, salt) => {
            if (err) return next(err);
            // Hash to password using the generated salt
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else {
        next();
    }
})

userSchema.methods.comparePassword = function(userPassword, cb) {
    bcrypt.compare(userPassword, this.password, (err, isMatched) => {
        if (err) throw cb(err);
        cb(null, isMatched);
    })
}

userSchema.methods.generateToken = function(cb) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(),'supersecret');

    user.token = token;
    user.save((err, user) => {
        if (err) return cb(err);
        cb(null, user);
    })
}

userSchema.statics.findByToken = function(token, cb) {
    const user = this;
    jwt.verify(token, 'supersecret', (err, decode) => {
        user.findOne({"_id": decode, "token": token}, (err, user) => {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }