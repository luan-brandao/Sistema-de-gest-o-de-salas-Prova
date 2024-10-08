const mongoose = require("mongoose");
require ("dotenv").config();

const connectDB = async()=>{
    try{ 
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedtopology:true
        });
   
    }catch(error){
        console.error(error.message);
        process.exit(1);
    }
};



module.exports= connectDB;