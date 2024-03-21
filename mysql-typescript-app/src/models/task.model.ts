import { DataTypes } from "sequelize";
import connect from "../database";

const TaskModel = connect.define("task",{
    id: {type: DataTypes.NUMBER,
        primaryKey: true   
    },
    type:{type: DataTypes.STRING},
    task:{type: DataTypes.STRING},
    completed:{type: DataTypes.BOOLEAN},
    created_at:{type:DataTypes.TIME},
    personaId:{type:DataTypes.NUMBER}
})

export default TaskModel