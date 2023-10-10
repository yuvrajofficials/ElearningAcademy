import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js"
import contentRoute from "./routes/contentRoute.js"
import courseRoute from "./routes/courseRoute.js"
import assignmentRoute from "./routes/assignmentRoute.js"
import studymaterialRoute from "./routes/studymaterialRoute.js"
import path from 'path';
import {fileURLToPath} from 'url'

//configure env
dotenv.config();

//databse config
connectDB();
const fileName__ = fileURLToPath(import.meta.url);

//rest object
const app = express();
app.use(express.static(path.join(__dirname,'./teachingplatform/build')))

//middelwares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/content", contentRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/assignment", assignmentRoute);
app.use("/api/v1/studymaterial", studymaterialRoute);
//rest api
app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'./teachingplatform/build/index.html'));
  
})

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});