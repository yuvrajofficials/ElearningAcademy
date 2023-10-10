import mongoose from "mongoose";

const studymaterialSchema = new mongoose.Schema({
  title : {
    type : String,
},
description : {
    type : String,
},
materialfile: {
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
export default mongoose.model('studymaterial',studymaterialSchema);
