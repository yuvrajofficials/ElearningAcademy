import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModels.js';
import JWT from 'jsonwebtoken';
import fs from 'fs';
import userModels from '../models/userModels.js';


export const registerController = async (req,res) => {
   
    try {
        const { email, phone, cfpassword, crpassword,firstname,lastname,middlename,username,answer} = req.fields;
        //validations
        console.log( req.body);
   
        const { profilephoto  } = req.files;
        console.log(profilephoto,email);
        if (!email) {
          return res.send({ error: "Email is Required" });
        }
        if (!cfpassword) {
          return res.send({ error: "Password is Required" });
        }
        if (!phone) {
          return res.send({ error: "Phone no is Required" });
        }
      
 
   const existingUser = await userModel.findOne({email})
   //existing user
   if(existingUser){
    return res.status(200).send({
        success: false,
        message: 'Already Register Please Login',
    })
   }

   // register user
     const hashedPassword = await hashPassword(cfpassword)
     const content = new userModel({ ...req.fields, slug: slugify(title) });
    if (profilephoto) {
      content.profilephoto.data = fs.readFileSync(profilephoto.path);
      content.profilephoto.contentType = profilephoto.type;
    }
    await content.save();
    res.status(201).send({
      success: true,
      message: "Account Created Successfully",
      content,
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({
        success : false,
        message: "Error is Registration ",
        error,
    })
}
}


// Post Login

export const loginController = async (req,res) =>{
    try {
        const {email,cfpassword} = req.body
        //validation
        if(!email || !cfpassword){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            });
        }

        //check user 
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }
        const match = await comparePassword(cfpassword,user.cfpassword)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            });
        }
        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message:"login Successfully",
            user:{
                
                email: user.email,
                phone: user.phone,
                firstname: user.firstname,
                lastname: user.lastname,
                logintype: user.logintype,
               
            },token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in login',
            error,
        })
        
    }
    
};


  //forgot password controller
  export const forgotPasswordController = async (req,res) =>{
      console.log("came in server1")
    try {
        const { email, answer, newPassword } = req.body;
        console.log("came in server")
        if (!email) {
          res.status(400).send({ message: "Email is required" });
        }
        if (!answer) {
          res.status(400).send({ message: "answer is required" });
        }
        if (!newPassword) {
          res.status(400).send({ message: "New Password is required" });
        }
        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "Wrong Email Or Answer",
          });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { cfpassword: hashed , crpassword: newPassword });
        res.status(200).send({
          success: true,
          message: "Password Reset Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Something went wrong",
          error,
        });
      }

    
}


  // insitute login controller 
  export const instituteloginController = async (req,res) =>{


      

    try {
        const {email,cfpassword,fullname,institute} = req.body
        //validation
        if(!email || !cfpassword || !institute){
            return res.status(404).send({
                success:false,
                message:"Invalid Credentials "
            });
        }

        //check user 
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }
        const match = await comparePassword(cfpassword,user.cfpassword)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            });
        }
        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message:"login Successfully",
            user:{
                
                email: user.email,
                fullname: user.fullname,
                institute: user.institute,
               
            },token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in login',
            error,
        })
        
    }
 


  }


 

// get photo
export const  profilePhotoController = async (req, res) => {
  try {
    const product = await userModels.findById(req.params.pid).select("profilephoto");
    if (product.profilephoto.data) {
      res.set("Content-type", product.profilephoto.contentType);
      return res.status(200).send(product.profilephoto.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting Profile Photo",
      error,
    });
  }
};

  
//test controller
export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };