import { User } from "../models/user";

export interface NotificationService {
  notifyUserForgotPassword(user: User): Promise<void>
}
