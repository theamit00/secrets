const mongoose = require('mongoose');

const connect = (url)=>{

    mongoose.connect(url)
    .then(()=>{
        console.log('Database Connected');
    })
}

module.exports = connect;