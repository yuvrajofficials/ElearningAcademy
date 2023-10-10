import contentModels from "../models/contentModels.js";
import fs from 'fs';
import slugify from "slugify";

export const createContentController = async (req,res) => {

    try {
        const { price, category, title ,authorofcontent,description ,videolink ,videono} =
        req.fields;
        const { thumbnail } = req.files;

      switch (true) {
        case !title:
          return res.status(500).send({ error: "title is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !authorofcontent:
          return res.status(500).send({ error: "Author is Required" });
        case !price:
          return res.status(500).send({ error: "price is Required" });
        case !category:
          return res.status(500).send({ error: "category is Required" });
        case !thumbnail && thumbnail.size > 1000000:
          return res.status(500).send({ error: "Photo size should be less than 1 mb " });
      }
      const content = new contentModels({ ...req.fields, slug: slugify(title) });
      if (thumbnail) {
        content.thumbnail.data = fs.readFileSync(thumbnail.path);
        content.thumbnail.contentType = thumbnail.type;
      }
      await content.save();
      res.status(201).send({
        success: true,
        message: "Content Uploaded Successfully",
        content,
      });

} catch (error) {
    console.log(error)
    res.status(500).send({
        success : false,
        message: "Error in uploading content ",
        error,
    })
}
}

// In below code product variable is used instead of content variable 

export const getContentController = async (req,res) => {

  try {
    const contents = await contentModels
      .find({})
      .populate("category")
      .select("-thumbnail")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: contents.length,
      message: "All Contents ",
      contents,
    });
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting contents",
      error: error.message,
     
    });
  }
};
// get single product
export const getSingleContentController = async (req, res) => {
  try {
    const content = await contentModels.findOne({ slug: req.params.slug });
    console.log(content);
    res.status(200).send({
      success: true,
      message: "Single Content Fetched",
      content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single content",
      error,
    });
  }
};

// get photo
export const contentPhotoController = async (req, res) => {
  try {
    const product = await contentModels.findById(req.params.pid).select("thumbnail");
    if (product.thumbnail.data) {
      res.set("Content-type", product.thumbnail.contentType);
      return res.status(200).send(product.thumbnail.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting thumbnail",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await contentModels.findByIdAndDelete(req.params.pid).select("-thumbnail");
    res.status(200).send({
      success: true,
      message: "Content Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting content",
      error,
    });
  }
};



//upate producta
export const updateContentController = async (req, res) => {
  try {
    const { authorofcontent, description, price, category, title, videolink ,videono } =
      req.fields;
    const { thumbnail } = req.files;
    //alidation
    switch (true) {
      case !title:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !authorofcontent:
        return res.status(500).send({ error: "Quantity is Required" });
      case thumbnail && thumbnail.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await contentModels.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(title) },
      { new: true }
    );
    if (thumbnail) {
      products.thumbnail.data = fs.readFileSync(thumbnail.path);
      products.thumbnail.contentType = thumbnail.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

