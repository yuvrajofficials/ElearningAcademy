import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  
    title : {
        type : String,
    },
    description : {
        type : String,
    },
    assignmentfile: {
      data: Buffer,
      contentType: String,
    },
  slug : {
    type : String,
    lowercase : true,

},
 
},
{ timestamps: true }


);
export default mongoose.model('assignment',assignmentSchema);
