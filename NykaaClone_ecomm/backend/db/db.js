const mongoose = require('mongoose')
const DB = process.env.DATABASE
console.log("Database URI:", DB)
mongoose.set('strictQuery', false)

mongoose.connect(DB,{
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>console.log("db connected")).catch((er)=>console.log("Database error:", er))