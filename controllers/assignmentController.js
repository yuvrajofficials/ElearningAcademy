import assignmentModel from "../models/assignmentModel.js"
import fs from 'fs';
import slugify from "slugify";

export const assignmentController = async (req,res) => {

    try {
        const {  title, description } =
        req.fields;
      const { assignmentfile } = req.files;

      switch (true) {
        case !title:
          return res.status(500).send({ error: "title is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !assignmentfile && assignmentfile.size > 1000000:
          return res.status(500).send({ error: "Photo size should be less thank 1 mb " });
      }
      const content = new assignmentModel({ ...req.fields, slug: slugify(title) });
      if (assignmentfile) {
        content.assignmentfile.data = fs.readFileSync(assignmentfile.path);
        content.assignmentfile.contentType = assignmentfile.type;
      }
      await content.save();
      res.status(201).send({
        success: true,
        message: "Assignment Uploaded Successfully",
        content,
      });

} catch (error) {
    console.log(error)
    res.status(500).send({
        success : false,
        message: "Error in uploading assignment",
        error,
    })
}
}