import express from "express";
import { serve, setup } from "swagger-ui-express";
import router from "./router";
import { boostrap, shutdown } from "./bootstrap";
import fs from "fs";
import yaml from "js-yaml";
import { registerErrorHandlers } from "./infra/middlewares/errorHandlers";

async function main(): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    try {
      const app = express();
      app.use(express.json());
      const swaggerFile = fs.readFileSync("./src/docs/swagger.yml", "utf8");
      app.use("/api-docs", serve, setup(yaml.load(swaggerFile)));
      app.use(router);
      registerErrorHandlers(app);
      app.use((error, req, res, next) => {
        if (error) {
          console.log("Default error handler for ", error);
          res.status(500).json({ message: `Unexpected error: ${error.message || "no message see server logs."}` });
        } else {
          next();
        }
      });
      const port = process.env.PORT || 3000;
      const server = app.listen(port);
      console.log(`Server started on port: ${port}`);
      // server.on("error", reject);
      server.on("close", resolve);
    } catch (e) {
      reject(e);
    }
  });
}

boostrap()
  .then(main)
  .then(() => console.log("Execution done!"))
  .catch((error) => console.log("Execution error:", error))
  .then(() => console.log("Shutting down..."))
  .then(shutdown)
  .catch((error) => console.log("Shutdown error:", error));
