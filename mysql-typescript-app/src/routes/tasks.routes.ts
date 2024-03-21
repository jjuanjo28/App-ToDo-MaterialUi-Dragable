import { Router } from "express";
import { decodeToken } from "../../auth/decodeToken";
const router = Router()

import { getAllTasks,createTask, editTask, deleteTask, getOneTask, getTasksUser  } from "../controller/task.controller";


router.route("/").get(decodeToken,getAllTasks)
router.get("/user/:id",decodeToken, getTasksUser)
router.get("/:id",decodeToken,getOneTask)
router.post("/",decodeToken, createTask)
router.put("/:id",decodeToken, editTask)
router.delete("/:id",decodeToken, deleteTask)

export default router