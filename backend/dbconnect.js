const { default: mongoose } = require("mongoose")

const dbConnect = ()=>{
    try{
        const conn=mongoose.connect(process.env.DATABASE_URL);
        console.log("Database Connected ");
    } catch (error){
        console.log("Database Error");
    }
};
module.exports = dbConnect;