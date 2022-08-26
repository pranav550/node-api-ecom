const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");



const securePassword = async(password)=>{
    try{
      const passwordHash = await bcryptjs.hash(password,10);
      return passwordHash;

    }catch(error){
        res.status(400).send(error.message);
    }
} 
const register_user = async(req,res)=>{

    const spassword = await  securePassword(req.body.password)
    try{
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:spassword,
            mobile:req.body.mobile,
            image:req.file.filename,
            type:req.body.type,
        })

        const userData = await User.findOne({email:req.body.email});
        if(userData){
            return res.status(200).send({success:false, msg:"This mail is already exist"})
        }else{
           const user_data = await user.save();
           return res.status(200).send({success:true, data:user_data})
        }
       
    }catch(error){
       res.status(400).send(error.message);
    }
}

module.exports = {register_user}