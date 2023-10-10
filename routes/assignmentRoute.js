import express from "express";
import { requireSignIn, isAuthFaculty } from "../middlewares/authMiddleware.js";
import {assignmentController} from "../controllers/assignmentController.js"
import formidable from "express-formidable";

const router = express.Router()


router.post(
    "/assignment-upload",
    requireSignIn,
    isAuthFaculty,formidable(),
    assignmentController 
  );


  export default router