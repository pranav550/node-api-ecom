const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require("../config/config");

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

const createToken = async(id)=>{
    try{
        const tokren = await jwt.sign({ _id: id }, config.secret_key);
        return tokren;
    }catch(error){
        res.status(400).send(error.message);
    }
}


const user_login = async (req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

      const is_exist=await User.findOne({email:email});
      console.log("1",is_exist)
      if(is_exist){
       const password_match= await bcryptjs.compare(password,is_exist.password);
       console.log("2",password_match)
       const token_data  = await createToken(is_exist.id)
       if(password_match){
        const user_data = {
            _id:is_exist._id,
            name:is_exist.name,
            email:is_exist.email,
            password:is_exist.password,
            mobile:is_exist.mobile,
            type:is_exist.type,
            token:token_data
        }
        res.status(200).send({success:true, data: user_data});
       }else{
        res.status(200).send({success:false, message:"Invalid Login"}); 
       }

      }else{
        res.status(200).send({success:false, message:"Invalid Login"});
      }
    }catch(error){
        res.status(400).send(error.message);
    }
}

const update_password = async(req,res)=>{
    try{
      const user_id = req.body.user_id;
      const password = req.body.password;

      const data = await User.findOne({_id:user_id});
      if(data){
        const newPassword =await securePassword(password);
        const userData = await User.findByIdAndUpdate({_id:user_id},
            {$set:{
            password:newPassword
        }})

        res.status(200).send({success:true, message:"Your password has been updated"});    
      }else{
        res.status(200).send({success:false, message:"Invalid userID"});    
      }

    }catch(error){
    res.status(400).send(error.message);
    }
}

module.exports = {register_user, user_login,update_password}