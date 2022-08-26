const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = (req,res,next)=>{
    const token = req.headers['authorization'];
    if(!token){
        res.status(200).send({success:false,msg:"token requred for authentication"})
    }else{
        try{
          const decode = jwt.verify(token,config.secret_key);
          req.user = decode;
        }catch(error){
            res.status(400).send({success:false,msg:"Invalid Token"})
        }
        
    }
    next();
}

module.exports = verifyToken;
