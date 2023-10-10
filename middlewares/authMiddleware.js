import JWT from 'jsonwebtoken'
import userModels from '../models/userModels.js';

//protected  routes token base
export const requireSignIn = async (req,res,next) =>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
};


//admin access
export const isAdmin = async (req,res,next) => {
    try {
        const user = await userModels.findById(req.user._id);
        if(user.logintype === 1){
            next();
            
        }
        else {
            return res.status(201).send({
                message: "UnAuthorized Access",
                success:false,
            });
           
        }
            
    } catch (error) {
        console.log(error)
        res.status(401).send({
        success:false,
        message:'error in admin middleware',
        error
    })
}
}

//teacher access
export const isTeacher = async (req,res,next) => {
    try {
        const user = await userModels.findById(req.user._id);
        if(user.logintype === 2){
            
            next();
            
        }else {
            return res.status(201).send({
                message: "UnAuthorized Access",
                success:false,
            });
           
        }
            
    } catch (error) {
        console.log(error)
        res.status(401).send({
        success:false,
        message:'error in teacher middleware',
        error
    })
}
}

//teacher access
export const isAuthFaculty = async (req,res,next) => {
    try {
        const user = await userModels.findById(req.user._id);
        if(user.logintype === 2 || user.logintype === 1){
            
            next();
            
        }else {
            return res.status(201).send({
                message: "UnAuthorized Access",
                success:false,
            });
           
        }
            
    } catch (error) {
        console.log(error)
        res.status(401).send({
        success:false,
        message:'error in teacher middleware',
        error
    })
}
}

