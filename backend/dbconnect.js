const { default: mongoose } = require("mongoose")

const dbConnect = ()=>{
    try{
        const conn=mongoose.connect("mongodb+srv://sharonraju1243:Sharonraju&64@twitter.eyqfbrw.mongodb.net/?retryWrites=true&w=majority&appName=Twitter");//mongodb+srv://sharonraju1243:Sharonraju&64@twitter.eyqfbrw.mongodb.net/?retryWrites=true&w=majority&appName=Twitter/Twitter});
        console.log("Database Connected ");
    } catch (error){
        console.log("Database Error");
    }
};
module.exports = dbConnect;