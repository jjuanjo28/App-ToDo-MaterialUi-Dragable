import { Request, Response } from "express";
import TaskModel from "../models/task.model";
import  jwt from "jsonwebtoken";


const verifyToken = function(req: Request, res: Response) {
  const token:any = req.headers.authorization?.split(" ")[1]
  const decoded:any =  jwt.verify(token,"secretKey")
 
  if(Date.now() > decoded.exp){
  return res.status(401).send({error:"token expired"})
  }

}
export async function getAllTasks(req:Request, res: Response){
   
    try {
      const token:any = req.headers.authorization?.split(" ")[1]
      const decoded:any =  jwt.verify(token,"secretKey")
     
      if(Date.now() > decoded.exp){
      return res.status(401).send({error:"token expired"})
      }
   
        verifyToken(req,res)
        const tasks = await TaskModel.findAll()
        res.json(tasks);
     
    } catch (error) {
        res.json({ message: error });
    }
}

 // crear un nuevo Prestamo
    
 export const createTask = async (req:any, res: Response) => {
      
        
       try {
        const token:any = req.headers.authorization?.split(" ")[1]
        const decoded:any =  jwt.verify(token,"secretKey")
       
        if(Date.now() > decoded.exp){
        return res.status(401).send({error:"token expired"})
        }
           await TaskModel.create(req.body);
           
      res.json({
        message: "Prestamo Creado Correctamente",
      });
    } catch (error) {
    
      res.json({ message: error });
    }
  };
  

    // Mostrar un Prestamo

    export const getOneTask = async (req:Request, res:Response) => {
        try {
          const token:any = req.headers.authorization?.split(" ")[1]
          const decoded:any =  jwt.verify(token,"secretKey")
         
          if(Date.now() > decoded.exp){
          return res.status(401).send({error:"token expired"})
          }
          const prestamo = await TaskModel.findAll({
            where: {
              id: req.params.id,
            },
          });
           res.json(prestamo);
             } catch (error) {
          res.json({ message: error});
        }
      }
      
      export const getTasksUser = async (req:Request, res:Response) => {
        try {
          const token:any = req.headers.authorization?.split(" ")[1]
          const decoded:any =  jwt.verify(token,"secretKey")
         
          if(Date.now() > decoded.exp){
          return res.status(401).send({error:"token expired"})
          }
          const prestamo = await TaskModel.findAll({
            where: {
              personaID: req.params.id,
            },
          });
           res.json(prestamo);
             } catch (error) {
          res.json({ message: error});
        }
      }
      
      // actualizar un Prestamo
      
      export const editTask = async (req:Request, res:Response) => {
        try {
          const token:any = req.headers.authorization?.split(" ")[1]
          const decoded:any =  jwt.verify(token,"secretKey")
         
          if(Date.now() > decoded.exp){
          return res.status(401).send({error:"token expired"})
          }
          await TaskModel.update(req.body, {
            where: { id: req.params.id }, 
          });
          res.json({
            message: "Prestamo Editado Correctamente",
          });
        } catch (error) {
          res.json({ message: error });
        }
      };
      
      // eliminar un Prestamo
      
      export const deleteTask = async (req: Request, res:Response) => {
        try {
          const token:any = req.headers.authorization?.split(" ")[1]
          const decoded:any =  jwt.verify(token,"secretKey")
         
          if(Date.now() > decoded.exp){
          return res.status(401).send({error:"token expired"})
          }
          verifyToken(req,res)
          await TaskModel.destroy({
            where: { id: req.params.id },
          });
          res.json({
            message: "Prestamo Eliminado",
          });
        } catch (error) {
          res.json({ message: error });
        }
      };