const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { User } = require('./models/user');
const { auth } = require('./middlewares/auth');

const app = express();

app.use(express.json());
app.use(cookieParser());

const url = 'mongodb://localhost:27017/auth';
const port = process.env.PORT || 3000;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
} 

mongoose.Promise = global.Promise;
mongoose.connect(url, options, () => {
    console.log('connected');
});

app.post('/api/user', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    user.save((err, doc) => {
        if (err) res.status(400).send(err);
        res.status(200).send(doc);
    })
});

app.post('/api/user/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) throw err;
        if (!user) res.status(400).json({message: 'Auth failed: user not found'});
        else {
            user.comparePassword(req.body.password, (err, isMatched) => {
                if (err) throw err;
                if (!isMatched) return res.status(400).json({
                    message: "Auth failed: Wrong password"
                })
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    res.cookie('auth', user.token).json({message: 'Auth success: You are logged in succesfully.'});
                })
            })
        }
    })
})

app.get('/api/user/profile', auth ,(req,res) => {
   res.status(200).send(req.token);
})
 
app.listen(port, () => {
    console.log(`Started on port ${port}`);
})