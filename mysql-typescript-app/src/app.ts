import express, { Application } from "express"
import morgan from "morgan"
import TasksRoutes from "./routes/tasks.routes"
import UserRoutes from "./routes/user.routes"
import bodyParser from "body-parser"
import cors from "cors"
import { port } from "../config"
import path from "path"
import multer from "multer"




const NODE_ENV = process.env.NODE_ENV || "development"

 const storage = multer.diskStorage({
   destination: (req, file, cb)=> {
      cb(null, "./uploads")
   },
   filename:(req, file, cb)=>{
      cb(null, file.originalname + ".jpg")
   }
})

export const upload = multer({storage})


require("dotenv").config({
   path:`.env.${NODE_ENV}`
})



export class App {
     app: Application

     constructor(private port?: number | string){
        this.app = express()
        this.settings()
        this.middleware()
        this.routes()
     }
     settings(){
        this.app.set("port", this.port || port ||3000)
     }
     middleware(){
        this.app.use(morgan("dev"))
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(cors())
        this.app.use(express.static("files"))
        
        
      }
      routes() {
         this.app.use("/tasks", TasksRoutes)
         this.app.use("/users",UserRoutes)
         this.app.use("/uploads", express.static(path.resolve(__dirname,"../../uploads")))
         }

    async listen(){

      this.app.listen(this.app.get("port"))
      console.log(`Server  on port ${this.app.get("port")}`);
     }

}
