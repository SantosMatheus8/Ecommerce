import { Request, Response } from "express";
import { CreateUser, QueryUsers, UserResponse, UsersOrderByEnum } from "../../domain/dtos/user";
import { UserUseCase } from "../../use-cases/userUseCase";
import { User, UserStatusEnum } from "../../domain/models/user";
import { QueryRequest } from "../dtos/request";
import { OrderDirection, PaginatedFindConditions } from "../../domain/dtos/generic";

export class UserController {
  private static _instance: UserController | null = null;
  userUseCase: UserUseCase;

  private constructor() {}

  static get instance(): UserController {
    if (UserController._instance === null) {
      UserController._instance = new UserController();
    }

    return UserController._instance;
  }

  public async create(
    req: Request<Record<string, unknown>, CreateUser>,
    res: Response
  ): Promise<void> {
    const createUser = req.body;
    const user = await this.userUseCase.create(createUser);
    const simplifiedUser = this.toSimpleUser(user);

    res.status(201).send(simplifiedUser);
  }

  public async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await this.userUseCase.findById(Number(id));
    const simplifiedUser = this.toSimpleUser(user);

    res.status(200).send(simplifiedUser);
  }

  public async findAll(req: QueryRequest<QueryUsers>, res: Response): Promise<void> {
    const query: PaginatedFindConditions<User> = {
      conditions: {},
      page: parseInt(req.query.page),
      itemsPerPage: parseInt(req.query.itemsPerPage),
    };

    if (req.query.name) {
      query.conditions.name = req.query.name;
    }
    if (req.query.email) {
      query.conditions.email = req.query.email;
    }
    if (req.query.status && UserStatusEnum[req.query.status]) {
      query.conditions.status = UserStatusEnum[req.query.status];
    }
    if (req.query.orderBy && UsersOrderByEnum[req.query.orderBy]) {
      query.orderBy = UsersOrderByEnum[req.query.orderBy];
    }
    if (req.query.orderDirection && OrderDirection[req.query.orderDirection]) {
      query.orderDirection = OrderDirection[req.query.orderDirection];
    }

    const { rows, page, totalRows } = await this.userUseCase.findAll(query);

    res.status(200).json({
      rows: rows.map((row) => this.toSimpleUser(row)), page, totalRows,
    });
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateUser = req.body;

    const user = await this.userUseCase.update(+id, updateUser);
    const simplifiedUser = this.toSimpleUser(user);

    res.status(200).send(simplifiedUser);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this.userUseCase.delete(Number(id));

    res.status(204).send();
  }

  public async inactivate(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await this.userUseCase.inactivate(+id);
    const simplifiedUser = this.toSimpleUser(user);

    res.status(200).send(simplifiedUser);
  }

  public async activate(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await this.userUseCase.activate(+id);
    const simplifiedUser = this.toSimpleUser(user);

    res.status(200).send(simplifiedUser);
  }

  public async unblock(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await this.userUseCase.unblock(+id);
    const simplifiedUser = this.toSimpleUser(user);

    res.status(200).send(simplifiedUser);
  }

  public async block(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await this.userUseCase.block(+id);
    const simplifiedUser = this.toSimpleUser(user);

    res.status(200).send(simplifiedUser);
  }

  private toSimpleUser(user: User): UserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
      status: user.status,
    };
  }
}
