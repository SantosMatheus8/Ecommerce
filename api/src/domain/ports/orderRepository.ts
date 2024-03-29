import { Order } from "../models/order";
import { Repository } from "./repository";

export interface OrderRepository extends Repository<Order> {}
