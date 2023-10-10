import bcrypt from "bcrypt"

export const hashPassword = async(cfpassword) => {
    try{

        const saltRounds=10;
        const hashedPassword = await bcrypt.hash(cfpassword, saltRounds);
        return hashedPassword;
    }catch(error){
        console.log(error);
        console.log(`Server ${error}`.bgCyan.white);
    }
} ;
    export const comparePassword = async (cfpassword , hashedPassword)=>{
        return bcrypt.compare(cfpassword, hashedPassword);
       }  ;