const userdb = require('../models/userShema')
const jwt = require('jsonwebtoken')

exports.isAuth = async(req,res,next) =>{
    try {
        const token = req.cookies.token || req.headers.authorization;
        console.log(token)
        if(token){
            const verifytoken = jwt.verify(token, process.env.JWT_SECRET);
        
            const rootUser = await userdb.findOne({_id:verifytoken._id});
        
            if(!rootUser) {throw new Error("user not found")}

            req.token = token
            req.rootUser = rootUser
            req.userId = rootUser._id

            next();
        }else{
            console.log("error")
            res.status(401).json({error: "Unauthorized"})
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Unauthorized"})
    }
}