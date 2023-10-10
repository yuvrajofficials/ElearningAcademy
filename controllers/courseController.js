import slugify from "slugify";
import courseModel from '../models/courseModel.js';

//createcategory
export const createCourseController = async (req, res) => {
  try {
    const { name , coursecategory,creatoremail } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    if (!creatoremail) {
      return res.status(401).send({ message: "Creator email is required" });
    }
    const existingCourse = await courseModel.findOne({ name });
    if (existingCourse) {
      return res.status(200).send({
        success: false,
        message: "Course Already Exisits",
      });
    }
    const course = await new courseModel({
      name,coursecategory,creatoremail,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new course created",
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in Course",
    });
  }
};


//update category
export const updateCourseController = async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const course = await courseModel.findByIdAndUpdate(
        id,
        { name, slug: slugify(name) },
        { new: true }
      );
      res.status(200).send({
        success: true,
        messsage: "Course Updated Successfully",
        course,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating course",
      });
    }
  };
  
  // get all cat
  export const courseController = async (req, res) => {
    try {
      const course = await courseModel.find({});
      res.status(200).send({
        success: true,
        message: "All Course List",
        course,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all courses",
      });
    }
  };
  
  // single category
  export const singleCourseController = async (req, res) => {
    try {
      const course = await courseModel.findOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Get SIngle Course Successfully",
        course,
       
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single Course",
      });
    }
  };
  
  //delete category
  export const deleteCourseController = async (req, res) => {
    try {
      const { id } = req.params;
      await courseModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Course Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting course",
        error,
      });
    }
  };
