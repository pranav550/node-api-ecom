const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require("../config/config");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

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
      if(is_exist){
       const password_match= await bcryptjs.compare(password,is_exist.password);
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

const forget_password = async (req,res)=>{
    try{

        const email = req.body.email;
        const is_exist = await User.findOne({email:email});
        if(is_exist){
            const randomString =  randomstring.generate();
            const data = await User.updateOne({email:email}, {$set:{token:randomString}});
            sendResetPasswordMail(is_exist.name,is_exist.email,randomString)
            res.status(200).send({success:true, message:"Please Check Your Inbox.Reset Your Password"});    
        }else{
            res.status(200).send({success:false, message:"Email does not exist"});    
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}

const sendResetPasswordMail = async(name,email,token)=>{
     try{
        const transporter = nodemailer.createTransport({
                service:'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS:true,
            
            auth: {
              user: config.emailUser,
              pass: config.emailPassword
            }
          });
          
          const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: 'For Reset Password',
            html: '<p>Hi '+name+', Please Copy Link And <a href="http://localhost:3000/api/reset-password?token='+token+'">Reset Your Password</a> </p>'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email Has Been Sent:-',info.response);
            }
          });
     }catch(error){
        res.status(400).send({success:false, msg:error.message});
     }
}

const reset_password = async(req,res)=>{
    try{
         const token = req.query.token;
         const tokenData = await User.findOne({token:token});
         if(tokenData){
          const password = req.body.password;
          const newPassword = await securePassword(password);
          const userData = await User.findByIdAndUpdate({_id:tokenData._id},{$set:{password:newPassword, token:''}},{new:true} );
          res.status(200).send({success:true, msg:"User PAssword Has been Reset",data:userData}); 
         }else{
            res.status(200).send({success:false, msg:"This link has been expired"}); 
         }
    }catch(error){
        res.status(400).send({success:false, msg:error.message});
    }
}

module.exports = {
     register_user,
     user_login,
     update_password,
     forget_password,
     reset_password
    }