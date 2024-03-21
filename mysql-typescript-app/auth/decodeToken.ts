import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { secret } from "../config"

// funcion para decodificar el token jwt(recuerda importar, Request,Response, NextFunction de express)

export function decodeToken(req:Request,res:Response,next:NextFunction) {
    
  const token:any = req.headers.authorization?.split(" ")[1]
  const decoded:any =  jwt.verify(token,`${secret}`)
   
  if(Date.now() > decoded.exp){
    return res.status(401).send({error:"token expired"})
  }
  next()
}
