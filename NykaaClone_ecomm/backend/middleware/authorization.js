exports.authorization = (...roles) => {

    return (req,res,next) => {
        
        const userRole = req.rootUser.role;

        if(!roles.includes(userRole)){
            
            return res.status(403).json({error: `Role: ${userRole} is not allowed to access`})
        }

        next()

    }
}