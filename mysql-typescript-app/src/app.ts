import express, { Application } from "express"
import morgan from "morgan"
import TasksRoutes from "./routes/tasks.routes"
import UserRoutes from "./routes/user.routes"
import bodyParser from "body-parser"
import cors from "cors"
import { port } from "../config"

const NODE_ENV = process.env.NODE_ENV || "development"

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
     }
     routes() {
        this.app.use("/tasks", TasksRoutes)
        this.app.use("/users",UserRoutes)
     }

    async listen(){

      this.app.listen(this.app.get("port"))
      console.log(`Server on port ${this.app.get("port")}`);
      
     }

}