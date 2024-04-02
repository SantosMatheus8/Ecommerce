import { Router } from "express";
import { authController, orderController, productController, userController } from "./bootstrap";
import { QueryRequest } from "./infra/dtos/request";
import { QueryUsers } from "./domain/dtos/user";
import { errorHandlerWrapper } from "./infra/middlewares/errorHandlers";
import { QueryProducts } from "./domain/dtos/product";
import { QueryOrders } from "./domain/dtos/order";

const router = Router();
// Authentication

router.post(
  "/auth/v1/login",
  async(req, res) => await authController.login(req, res)
);

// Users
router.post(
  "/users/v1/users",
  errorHandlerWrapper(async(req, res) => await userController.create(req, res))
);
router.get(
  "/users/v1/users/:id",
  errorHandlerWrapper(
    async(req, res) => await userController.findById(req, res)
  )
);
router.get(
  "/users/v1/users",
  errorHandlerWrapper(
    async(req: QueryRequest<QueryUsers>, res) =>
      await userController.findAll(req, res)
  )
);
router.delete(
  "/users/v1/users/:id",
  errorHandlerWrapper(async(req, res) => await userController.delete(req, res))
);
router.put(
  "/users/v1/users/:id",
  errorHandlerWrapper(async(req, res) => await userController.update(req, res))
);
//
//
//
//
//
router.post(
  "/products/v1/products",
  errorHandlerWrapper(
    async(req, res) => await productController.create(req, res)
  )
);
router.get(
  "/products/v1/products/:id",
  errorHandlerWrapper(
    async(req, res) => await productController.findById(req, res)
  )
);
router.get(
  "/products/v1/products",
  errorHandlerWrapper(
    async(req: QueryRequest<QueryProducts>, res) =>
      await productController.findAll(req, res)
  )
);
router.delete(
  "/products/v1/products/:id",
  errorHandlerWrapper(
    async(req, res) => await productController.delete(req, res)
  )
);
router.put(
  "/products/v1/products/:id",
  errorHandlerWrapper(
    async(req, res) => await productController.update(req, res)
  )
);
//
//
//
//
//
//
router.post(
  "/orders/v1/orders",
  errorHandlerWrapper(
    async(req, res) => await orderController.create(req, res)
  )
);
router.get(
  "/orders/v1/orders/:id",
  errorHandlerWrapper(
    async(req, res) => await orderController.findById(req, res)
  )
);
router.get(
  "/orders/v1/orders",
  errorHandlerWrapper(
    async(req: QueryRequest<QueryOrders>, res) =>
      await orderController.findAll(req, res)
  )
);
router.delete(
  "/orders/v1/orders/:id",
  errorHandlerWrapper(
    async(req, res) => await orderController.delete(req, res)
  )
);

export default router;
