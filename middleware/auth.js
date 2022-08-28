const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = (req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers['authorization'];
    if(!token){
        res.status(200).send({success:false,msg:"token requred for authentication"})
    }
    else{
        try{
          const decode = jwt.verify(token,config.secret_key);
          req.user = decode;
        }catch(error){
           return res.status(400).json({success:false,msg:"Invalid Token"})
            
        }
        
    }
   return next();
}

module.exports = verifyToken;
