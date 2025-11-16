const userdb = require('../models/userShema')
var bcrypt = require("bcryptjs");

// register 
exports.registerUser = async(req,res)=>{

    const file = req.file.filename;
    const { fname,lname,email,password,role} = req.body;
    console.log(fname,lname,email,password,role,file)
    // console.log(fname,lname)

    if (!fname || !email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await userdb.findOne({ email: email })

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        } else {
            const finalUser = new userdb({
                fname,lname,email,password,role,profile:file
            });

            // here password hasing
            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        // res.status(422).json(error)
        console.log(error)
    }
}

//  Login User
exports.loginUser = async(req,res)=>{

    const { email, password } = req.body;
    console.log(req.body)

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await userdb.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();

                // cookiegenerate
                res.cookie("token",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true,
                    sameSite: 'lax'
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block",error);
    }
}

exports.logoutUser = async(req,res,next) => {

    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("token",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
        console.log(error)
    }
    

}

// all users 

exports.getUsers = async(req,res) =>{
    try {
        let user = await userdb.find()
        res.status(201).json(user)
        // console.log(user)
    } catch (error) {
        console.log(error)
    }
}


// particular user
exports.deleteUser = async(req,res) => {

    const {id} = req.params 

    try {
        await userdb.findByIdAndDelete({_id:id},{ 
            new:true
        })
        res.status(200).json("sucessfully deleted")
    } catch (error) {
        console.log(error)
    }

}
