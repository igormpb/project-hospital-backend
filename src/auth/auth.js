const jwt = require('jsonwebtoken')

module.exports = (req,res,next) =>{

      const authHeader = req.header('Authorization')
     
      const token = authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ auth: false, message: 'Token não aprovado.' });

    
    jwt.verify(token,process.env.SECRET,(error,decoded) =>{
        if(error) return res.status(401).json({error: "token invalid" })
    
        req.roleAuth = decoded.roleAuth
        req.firstName = decoded._firstName
        req.lastName = decoded._lastName

        return next();

    })
}