import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";

// @ts-ignore
import * as configJson from "../config/config.json";
const config: any = configJson[env as keyof typeof configJson];
const sequelize = config.url
    ? new Sequelize(config.url, config)
    : new Sequelize(config.database, config.username, config.password, config);

const initModals = async (sequelizeInstance: Sequelize) => {
    try {
        console.info("Initializing models...");
        // await Todo.initModel(sequelizeInstance);
        console.info("Models initialized.");
    } catch (err: any) {
        console.error(err.message);
    }
};

export { Sequelize, sequelize, initModals };
