import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : Number,
        required : true,
        unique : true  
    },
  
    crpassword : {
        type : String,
    

    },
    cfpassword : {
        type : String,
        required : true
    },
     
    firstname : {
        type : String,
        required : true
        
    },
    middlename : {
        type : String,
        required : true
    },
  
    lastname : {
        type : String,
        required : true

    },
    username : {
        type : String,
        unique : true
    },
    fullname : {
        type : String
        
    },
    answer: {
        type: String,
        required: true,
      },
    institute : {
        type : String 
    },

    logintype : {
        type : Number, 
        default : 2
    },
    profilephoto: {
        data: Buffer,
        contentType: String,
      },
     
   
},{timestamps:true}
);

export default mongoose.model('users',userSchema);
