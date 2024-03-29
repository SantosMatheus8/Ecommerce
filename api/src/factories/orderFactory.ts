import { Order } from "../domain/models/order";
import { Product } from "../domain/models/product";
import { User } from "../domain/models/user";
import { OrderRepository } from "../domain/ports/orderRepository";
import { ProductRepository } from "../domain/ports/productRepository";
import { UserRepository } from "../domain/ports/userRepository";
import { OrderController } from "../infra/controllers/orderController";
import { OrderUseCase } from "../use-cases/orderUserCase";

export class OrderFactory {
  private static _instance: OrderFactory | null = null;

  static get instance(): OrderFactory {
    if (OrderFactory._instance === null) {
      OrderFactory._instance = new OrderFactory();
    }

    return OrderFactory._instance;
  }

  create(
    user: User,
    products: Product[],
    totalValue: number
  ): Order {
    const newOrder = Order.instance;
    newOrder.user = user;
    newOrder.products = products;
    newOrder.totalValue = totalValue;

    return newOrder;
  }
}

export class OrderUseCaseFactory {
  private static _instance: OrderUseCaseFactory | null = null;

  static get instance(): OrderUseCaseFactory {
    if (OrderUseCaseFactory._instance === null) {
      OrderUseCaseFactory._instance = new OrderUseCaseFactory();
    }

    return OrderUseCaseFactory._instance;
  }

  create(orderRepository: OrderRepository, productRepository: ProductRepository, userRepository: UserRepository): OrderUseCase {
    const orderOrderCase = OrderUseCase.instance;
    orderOrderCase.orderRepository = orderRepository;
    orderOrderCase.productRepository = productRepository;
    orderOrderCase.userRepository = userRepository;

    return orderOrderCase;
  }
}

export class OrderControllerFactory {
  private static _instance: OrderControllerFactory | null = null;

  static get instance(): OrderControllerFactory {
    if (OrderControllerFactory._instance === null) {
      OrderControllerFactory._instance = new OrderControllerFactory();
    }

    return OrderControllerFactory._instance;
  }

  create(orderOrderCase: OrderUseCase): OrderController {
    const orderController = OrderController.instance;
    orderController.orderUseCase = orderOrderCase;

    return orderController;
  }
}
