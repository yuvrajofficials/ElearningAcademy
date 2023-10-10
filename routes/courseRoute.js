import express from "express";
import { requireSignIn,isTeacher } from "../middlewares/authMiddleware.js";
import { courseController, createCourseController, deleteCourseController, singleCourseController, updateCourseController } from "../controllers/courseController.js";

const router = express.Router()

//routes
// create category
router.post(
  "/create-course",
  requireSignIn,
  isTeacher,
  createCourseController
);

//update category
router.put(
  "/update-course/:id",
  requireSignIn,
  isTeacher,
  updateCourseController
);

//getALl category
router.get("/get-course", courseController);

//single category
router.get("/single-course/:slug", singleCourseController);

//delete category
router.delete(
  "/delete-course/:id",
  requireSignIn,
  isTeacher,
  deleteCourseController
);



export default router