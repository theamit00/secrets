const express = require('express');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const session = require('express-session');

const connectDB = require('./db');
const homeRoute = require('./routes/home');
const userRoute = require('./routes/user');
const User = require('./models/user');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;


// ----MONGOOSE CONNECTION----
connectDB('mongodb://127.0.0.1:27017/mysecretsDB')
mongoose.set('strictQuery', true);

// ----Express----

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true })); // parse form data client side (for POST)


app.use(session({
    
    secret : "I am a full stack developer",
    resave : false,
    saveUninitialized : true
    
}))


// ----Passport----
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// passport.use(new LocalStrategy({

//         usernameField: 'username',
//         passReqToCallback: true
//     },
//     async function(req,username,password,done){

//         // find user and establish identity
//         const user = await User.findOne({username});
//         if(!user){
//             return done(null ,false,{message:"Incorrect Username"});
//         }
//         if(user.password !== password){
//             return done(null, false,{message:"Invalid Username"})
//         }
//         return done(null, user)
//     }
// ))


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})


// ----Routes----

app.use('/',homeRoute);
app.use('/user',userRoute);



// ----Server----
app.listen(PORT,()=>{
    console.log(`listening to the PORT:${PORT}`);
})