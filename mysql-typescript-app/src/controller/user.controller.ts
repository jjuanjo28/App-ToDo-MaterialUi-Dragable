import { Request, Response } from "express";
import PersonModel from "../models/user.model";
import jwt from "jsonwebtoken"


export const getLogin = async (req: Request, res: Response) => {
  const SECRET = process.env.SECRET;
    
  try {
    const user = req.body;
    const { name, password } = user;

    const isUserExist: any = await PersonModel.findOne({
      where: {
        name: name
      }
    });

    if (!isUserExist) {
      res.status(403).json({ message: "User not found" });
      return;
    }

    if (isUserExist.password === password) {
      const token = jwt.sign(
        {
          user: isUserExist,
          exp: Date.now() + 600 * 1000
        },
        `${SECRET}`
      );

      const decoded: any = jwt.verify(token, `${SECRET}`);
       res.status(200).json({
        idUser: decoded.user.idPersona,
        status: 200,
        success: true,
        message: "Login success",
        token: token
      });
    } else {
      res.status(404).json({
        status: 404,
        success: false,
        message: "Password wrong"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error"
    });
  }
};

// mostrar Todos los user

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await PersonModel.findAll();

    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
};

// mostrar un user

export const getUser = async (req: Request, res: Response) => {

  try {

    const user = await PersonModel.findAll({
      where: {
        idPersona: req.params.id,
      },
    });
    res.json(user[0]); // de aca sacaba el usuario completo 
  } catch (error) {
    res.json({ message: error });
  }
};

// crear un nuevo user

export const createUser = async (req: Request, res: Response) => {

   try {
    const email = await PersonModel.findAll({
      where: {
        email: req.body.email,
      }
    },
    );
    const user = await PersonModel.findAll({
      where: {
        name: req.body.name,
      }
    },
    );
    if (email.length != 0) return res.status(403).json({ message: "el email ya esta uso" })
    if (user.length != 0) return res.status(403).json({ message: "el nombre ya esta uso" })
        
    
    await PersonModel.create(req.body);
     

    res.json({
      message: "Usuario Creado Correctamente"
    });
  } catch (error) {
    res.json({ message: error });
  }
};

// actualizar un user

export const editUser = async (req: Request, res: Response) => {
    
  try {
       console.log("este es mi id:", req.params.id);
       
    await PersonModel.update(req.body, {
      
      where: { idPersona: req.params.id },
    });
    res.json({
      message: "Usuario Editado Correctamente",
    });
  } catch (error) {
    console.log("soy el req:", req);
    
    res.json({ message: error });
  }
};

// eliminar un user

export const deleteUser = async (req: Request, res: Response) => {
  try {

    await PersonModel.destroy(
      {
        where: { idPersona: req.params.id },
      }
    );
    res.json({
      message: "Usuario Eliminado",
    });
  } catch (error) {
    res.json({ message: error });
  }
};

