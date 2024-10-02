const checkRole = (...allowedRoles) => {

    return(req, res, next) => {
        if(!allowedRoles.includes(req.user.role)){
            console.log(req.user.role)
            return res.status(403).json({message:"User is not authorized"});
        }
        next();
    }

}

module.exports = checkRole;