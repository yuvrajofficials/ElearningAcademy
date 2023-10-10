import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
   
    name : {
        type : String,
        required : true,
        unique : true
    },
    coursecategory : {
        type : String,
        required : true,
    },
    creatoremail : {
        type : String,
        required : true,
    },
    slug : {
        type : String,
        lowercase : true,

    },
      
});
export default mongoose.model('course',courseSchema);
