import express from "express";
import { requireSignIn,isAdmin, isAuthFaculty } from "../middlewares/authMiddleware.js";
import { contentPhotoController, createContentController,deleteProductController,getContentController,getSingleContentController,updateContentController } from "../controllers/contentController.js";
import formidable from "express-formidable";

const router = express.Router()


router.post(
    "/create-content",
    requireSignIn,
    isAuthFaculty,formidable(),
    createContentController
  );
  //routes
  router.put(
    "/update-content/:pid",
    requireSignIn,
    isAuthFaculty,formidable(),
    updateContentController
  );

  // to get all contents

router.get("/get-content", getContentController);

//single product
router.get("/get-content/:slug", getSingleContentController);

//get photo
router.get("/content-thumbnail/:pid", contentPhotoController);

//delete rproduct
router.delete("/delete-content/:pid", deleteProductController);


  export default router