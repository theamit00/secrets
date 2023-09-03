const passport = require('passport');
const User = require('../models/user');
// const 


const handleGetRegister = async (req,res)=>{

    try {

        res.render('register');

    } catch (error) {

        console.log(error);
    }
}



const handleGetLogin = async (req,res)=>{

    try {
        
        res.render('login')

    } catch (error) {

        console.log(error);

    }
}


const handleGetSecrets =  async (req,res)=>{
    // console.log("sam");
    if(req.isAuthenticated()){
        // console.log("bye");
        res.render('secrets');
    }
    else{
        res.redirect('/user/login');
    }
}


const handleCreateUser = async (req,res,next)=>{

    // try {
        
    //     const {username, password} = req.body;
    //     const user = new User({username,password});
    //     const newUser = await 

    //     req.logIn(newUser,function(err){
    //         if (err) next(err);
    //         return res.redirect('/user/secrets');
    //     })

    // } catch (error) {
    //     console.log(error);
    // }

    try{
        console.log('amit');
        let {username,password} = req.body;
        const user = new User({username});
        const newUser = await User.register(user,password);
        res.send(newUser);
        req.login(newUser, function(err) {
            if (err) { return next(err); }
            // req.flash('success' , 'welcome, you are registered successfully')
            return res.redirect('/user/secrets');
        });
    }
    catch(e){
        // req.flash('error' , e.message);
        return res.redirect('/user/login');
    }

}


const handleLoginUser = async (req,res,next)=>{

    res.redirect('/user/secrets');    
}

const handleLogoutUser = async (req,res)=>{

    req.logout(function(err){
        if(err) { return next(err); }
        res.redirect('/user/login');
    });
}



module.exports = {

    handleGetRegister,
    handleGetLogin,
    handleCreateUser,
    handleLoginUser,
    handleGetSecrets,
    handleLogoutUser,
}