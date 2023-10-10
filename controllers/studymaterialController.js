
import studymaterialModel from "../models/studymatrialModel.js"
import fs from 'fs';
import slugify from "slugify";

export const studymaterialController = async (req,res) => {

    try {
        const {  title, description } =
        req.fields;
      const { materialfile } = req.files;

      switch (true) {
        case !title:
          return res.status(500).send({ error: "title is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !materialfile && materialfile.size > 1000000:
          return res.status(500).send({ error: "Document size should be less thank 1 mb " });
      }
      const content = new studymaterialModel({ ...req.fields, slug: slugify(title) });
      if (materialfile) {
        content.materialfile.data = fs.readFileSync(materialfile.path);
        content.materialfile.contentType = materialfile.type;
      }
      await content.save();
      res.status(201).send({
        success: true,
        message: "Material Uploaded Successfully",
        content,
      });

} catch (error) {
    console.log(error)
    res.status(500).send({
        success : false,
        message: "Error in uploading Material",
        error,
    })
}
}