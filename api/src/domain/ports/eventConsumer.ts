import { User } from "../models/user";

export interface EventConsumer {
  onForgotPassword(cbk: (user: User) => Promise<void>): Promise<void>
}
