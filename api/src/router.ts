import { Router } from "express";
import { authController, userController } from "./bootstrap";
import { QueryRequest } from "./infra/dtos/request";
import { QueryUsers } from "./domain/dtos/user";
import { errorHandlerWrapper } from "./infra/middlewares/errorHandlers";

const router = Router();
// Authentication

router.post("/auth/v1/login", async(req, res) => await authController.login(req, res));

// Users
router.post("/users/v1/users", errorHandlerWrapper(async(req, res) => await userController.create(req, res)));
router.get("/users/v1/users/:id", errorHandlerWrapper(async(req, res) =>
  await userController.findById(req, res))
);
router.get("/users/v1/users", errorHandlerWrapper(async(req: QueryRequest<QueryUsers>, res) => await userController.findAll(req, res)));
router.delete("/users/v1/users/:id", errorHandlerWrapper(async(req, res) =>
  await userController.delete(req, res))
);
router.put("/users/v1/users/:id", errorHandlerWrapper(async(req, res) =>
  await userController.update(req, res))
);
router.post("/users/v1/users/:id/inactivate", errorHandlerWrapper(async(req, res) =>
  await userController.inactivate(req, res))
);
router.post("/users/v1/users/:id/activate", errorHandlerWrapper(async(req, res) =>
  await userController.activate(req, res))
);
router.post("/users/v1/users/:id/unblock", errorHandlerWrapper(async(req, res) =>
  await userController.unblock(req, res))
);
router.post("/users/v1/users/:id/block", errorHandlerWrapper(async(req, res) =>
  await userController.block(req, res))
);

// Access Profile

export default router;
