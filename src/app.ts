import express from "express";
import helmet from "helmet";
import { initModals, sequelize } from "./database/models";
import { Route } from "./types/routes.type";
import morgan from "morgan";
import { errorHandler, notFound } from "./middlewares/errHandler.middleware";
import cors from "cors";
class App {
  public app: express.Application;
  public port: number | string;
  public env: string;
  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || "development";
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeDatabase();
    this.initializeModels();
    this.initializeErrorsHandler();
  }
  public listen() {
    try {
      this.app.listen(this.port, () => {
        console.log(
          `App listening on the port ${this.port} 🚀: http://localhost:${this.port} `
        );
      });
    } catch (err) {
      console.log(err);
    }
  }
  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: "*",
        credentials: true, //access-control-allow-credentials:true
      })
    );
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("", route.router);
    });
  }
  private async initializeDatabase() {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log("Database connected successfully 🚀 ");
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  public async initializeModels() {
    await initModals(sequelize);
  }

  public async initializeErrorsHandler() {
    await this.app.use(notFound);
    await this.app.use(errorHandler);
  }
}

export default App;
