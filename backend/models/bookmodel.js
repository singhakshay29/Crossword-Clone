const mongoose = require("mongoose");

const bookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
    },
    imgUrl:{
        type:String
    },
    price:{
        type:String
    },
    wasPrice:{
        type:String
    },
    discount:{
        type:String
    }
    },{
        timestamps:true
    });

module.exports=mongoose.model("Book",bookSchema);