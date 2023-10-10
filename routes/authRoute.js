import express from "express";
import {registerController,loginController,testController,instituteloginController, forgotPasswordController, profilePhotoController} from '../controllers/authController.js'
import { requireSignIn,isAdmin,isTeacher } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router()

//routing
router.post('/register',formidable(),registerController)

//login || post 
router.post('/login',loginController)

//test routes
router.get('/test',requireSignIn,isAdmin,testController)

//institutelogin  route

router.post('/institutelogin',instituteloginController)

//institutelogin  route

router.post('/forgot-password',forgotPasswordController)

// user-auth route

router.get('/user-auth',requireSignIn,(req,res) => {
    res.status(200).send({ ok : true});
})

// admin-auth route

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });
  
// teacher-auth route

router.get("/teacher-auth", requireSignIn, isTeacher, (req, res) => {
    res.status(200).send({ ok: true });
  });
  
  router.get("/profile-photo/:pid", profilePhotoController);

export default router