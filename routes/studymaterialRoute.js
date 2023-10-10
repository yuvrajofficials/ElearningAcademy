import express from "express";
import { requireSignIn, isAuthFaculty } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { studymaterialController } from "../controllers/studymaterialController.js";

const router = express.Router()


router.post(
    "/material-upload",
    requireSignIn,
    isAuthFaculty,formidable(),
    studymaterialController
  );

  export default router