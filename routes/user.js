const express = require('express');
const router = express.Router();
const{handleGetRegister, handleGetLogin, handleCreateUser, handleLoginUser, handleGetSecrets, handleLogoutUser} = require('../controllers/user');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');


router.route('/login')
    .get(handleGetLogin)
    .post(passport.authenticate('local',{
        failureRedirect: '/user/login', // redirect to the login page if there is an error
        // failureMessage: true,
        // successRedirect:'/user/secrets',
    }),handleLoginUser);


router.route('/register')
    .get(handleGetRegister)
    .post(handleCreateUser);


router.route('/secrets')
    .get(handleGetSecrets)


module.exports = router;
