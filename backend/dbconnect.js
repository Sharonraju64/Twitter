const { default: mongoose } = require("mongoose")

const dbConnect = ()=>{
    try{
        const conn=mongoose.connect("mongodb://127.0.0.1:27017/TwitterTest"); //process.env.DATABASE_URL
        console.log("Database Connected ");
    } catch (error){
        console.log("Database Error");
    }
};
module.exports = dbConnect;