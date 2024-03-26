import { Router } from "express";
import { accessProfileController, authController, userController } from "./bootstrap";
import { QueryRequest } from "./infra/dtos/request";
import { QueryUsers } from "./domain/dtos/user";
import { errorHandlerWrapper } from "./infra/middlewares/errorHandlers";
import { QueryAccessProfile } from "./domain/dtos/accessProfile";
import { QueryRoutesFeature } from "./domain/dtos/routesFeature";
import { QueryFeature } from "./domain/dtos/feature";

const router = Router();
// Authentication
router.post("/auth/v1/change-password", async(req, res) => await authController.changePassword(req, res));
router.post("/auth/v1/forgot-password", async(req, res) => await authController.forgotPassword(req, res));
router.post("/auth/v1/login", async(req, res) => await authController.login(req, res));
router.post("/auth/v1/login-azure", async(req, res) => await authController.loginAzure(req, res));
router.post("/auth/v1/login-google", async(req, res) => await authController.loginGoogle(req, res));
router.post("/auth/v1/refresh-token", async(req, res) => await authController.refreshToken(req, res));

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

router.post("/access-profiles/v1/access-profiles", errorHandlerWrapper(async(req, res) => await accessProfileController.create(req, res)));
router.get("/access-profiles/v1/access-profiles", errorHandlerWrapper(async(req: QueryRequest<QueryAccessProfile>, res) => await accessProfileController.findAll(req, res)));
router.get("/access-profiles/v1/access-profiles/:id", errorHandlerWrapper(async(req, res) => await accessProfileController.findById(req, res)));
router.put("/access-profiles/v1/access-profiles/:id", errorHandlerWrapper(async(req, res) => await accessProfileController.update(req, res)));
router.delete("/access-profiles/v1/access-profiles/:id", errorHandlerWrapper(async(req, res) => await accessProfileController.delete(req, res)));
router.get("/access-profiles/v1/features-routes", errorHandlerWrapper(async(req: QueryRequest<QueryRoutesFeature>, res) => await accessProfileController.findAllRoutesFeature(req, res)));
router.get("/features-routes/v1/features", errorHandlerWrapper(async(req: QueryRequest<QueryFeature>, res) => await accessProfileController.findAllFeature(req, res)));
router.post("/access-profiles/v1/access-profiles/:id/associate-users", errorHandlerWrapper(async(req, res) => await accessProfileController.associateUsers(req, res)));

export default router;
