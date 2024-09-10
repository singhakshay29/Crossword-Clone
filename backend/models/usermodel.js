const mongoose = require('mongoose');


const userSchema=mongoose.Schema({
    first:{
        type:String,
        required:true
    },
    last:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},
    {
        timeStamps:true
    }
    
)

module.exports=mongoose.model('User', userSchema);