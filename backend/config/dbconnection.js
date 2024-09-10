const mongoose = require ('mongoose');

const connectDB = async ()=>{
    try{
        const connect=await mongoose.connect(process.env.mongodbUrl);
        console.log(`database Connect`,connect.connection.host);
        
    }catch(err){
       console.log(err); 
    }
}

module.exports= connectDB;