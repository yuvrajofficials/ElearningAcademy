import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  
  videono: {
    type: Number,
  },
    videolink : {
        type : String,
    },
    description : {
        type : String,
    },
  
    authorofcontent : {
        type : String,
    },
   
    title : {
      type : String,
  },
    price: {
        type: Number,
        required: true,
      },
      slug : {
        type : String,
        lowercase : true,

    },
      category: {
        type: mongoose.ObjectId,
        ref: "category",
        required: true,
      },
      thumbnail: {
        data: Buffer,
        contentType: String,
      },
     
    },
    { timestamps: true }
  
    
);
export default mongoose.model('content',contentSchema);
