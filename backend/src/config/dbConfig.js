import { Sequelize } from "sequelize";
import "dotenv/config";

export default new Sequelize(process.env.DB_URL);
