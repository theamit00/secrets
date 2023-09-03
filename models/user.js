const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({

    username : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true,
    },

    secret:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Secret'
        }
    ]
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;