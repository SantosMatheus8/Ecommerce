import { Request, Response } from "express";
import { CreateOrder, QueryOrders, OrdersOrderByEnum } from "../../domain/dtos/order";
import { Order } from "../../domain/models/order";
import { QueryRequest } from "../dtos/request";
import { OrderDirection, PaginatedFindConditions } from "../../domain/dtos/generic";
import { OrderUseCase } from "../../use-cases/orderUserCase";

export class OrderController {
  private static _instance: OrderController | null = null;
  orderUseCase: OrderUseCase;

  private constructor() {}

  static get instance(): OrderController {
    if (OrderController._instance === null) {
      OrderController._instance = new OrderController();
    }

    return OrderController._instance;
  }

  public async create(
    req: Request<Record<string, unknown>, CreateOrder>,
    res: Response
  ): Promise<void> {
    const createOrder = req.body;
    const order = await this.orderUseCase.create(createOrder);

    res.status(201).send(order);
  }

  public async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const order = await this.orderUseCase.findById((id));

    res.status(200).send(order);
  }

  public async findAll(req: QueryRequest<QueryOrders>, res: Response): Promise<void> {
    const query: PaginatedFindConditions<Order> = {
      conditions: {},
      page: parseInt(req.query.page),
      itemsPerPage: parseInt(req.query.itemsPerPage),
    };

    if (req.query.orderBy && OrdersOrderByEnum[req.query.orderBy]) {
      query.orderBy = OrdersOrderByEnum[req.query.orderBy];
    }
    if (req.query.orderDirection && OrderDirection[req.query.orderDirection]) {
      query.orderDirection = OrderDirection[req.query.orderDirection];
    }

    const { rows, page, totalRows } = await this.orderUseCase.findAll(query);

    res.status(200).json({
      rows: rows.map((row) => (row)), page, totalRows,
    });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this.orderUseCase.delete((id));

    res.status(204).send();
  }
}
