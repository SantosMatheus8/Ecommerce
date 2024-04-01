import { Request, Response } from "express";
import { CreateProduct, QueryProducts, ProductsOrderByEnum } from "../../domain/dtos/product";
import { Product } from "../../domain/models/product";
import { QueryRequest } from "../dtos/request";
import { OrderDirection, PaginatedFindConditions } from "../../domain/dtos/generic";
import { ProductUseCase } from "../../use-cases/productUserCase";

export class ProductController {
  private static _instance: ProductController | null = null;
  productUseCase: ProductUseCase;

  private constructor() {}

  static get instance(): ProductController {
    if (ProductController._instance === null) {
      ProductController._instance = new ProductController();
    }

    return ProductController._instance;
  }

  public async create(
    req: Request<Record<string, unknown>, CreateProduct>,
    res: Response
  ): Promise<void> {
    const createProduct = req.body;
    const product = await this.productUseCase.create(createProduct);

    res.status(201).send(product);
  }

  public async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const product = await this.productUseCase.findById((id));

    res.status(200).send(product);
  }

  public async findAll(req: QueryRequest<QueryProducts>, res: Response): Promise<void> {
    const query: PaginatedFindConditions<Product> = {
      conditions: {},
      page: parseInt(req.query.page),
      itemsPerPage: parseInt(req.query.itemsPerPage),
    };

    if (req.query.name) {
      query.conditions.name = req.query.name;
    }
    if (req.query.description) {
      query.conditions.description = req.query.description;
    }
    if (req.query.price) {
      query.conditions.price = +req.query.price;
    }
    if (req.query.orderBy && ProductsOrderByEnum[req.query.orderBy]) {
      query.orderBy = ProductsOrderByEnum[req.query.orderBy];
    }
    if (req.query.orderDirection && OrderDirection[req.query.orderDirection]) {
      query.orderDirection = OrderDirection[req.query.orderDirection];
    }

    const { rows, page, totalRows } = await this.productUseCase.findAll(query);

    res.status(200).json({
      rows: rows.map((row) => (row)), page, totalRows,
    });
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateProduct = req.body;

    const product = await this.productUseCase.update(id, updateProduct);

    res.status(200).send(product);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this.productUseCase.delete((id));

    res.status(204).send();
  }
}
