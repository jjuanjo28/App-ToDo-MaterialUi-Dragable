import { Sequelize } from "sequelize"
import { db, user, pass } from "../config"

// cuando lo cargue en Sequelize debo parchearlo con ?.toString()
// por que si no, el mismo deja de funcionar

const connect = new Sequelize(`${db?.toString()}`, `${user?.toString()}`,`${pass?.toString()}`, {
  host: "localhost",
  dialect: "mysql",
  port: 3308,
  define: {
    timestamps: false,
  },
})
export default connect





