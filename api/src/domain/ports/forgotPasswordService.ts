import { ForgotPasswordPayload } from "../dtos/authentication";

export interface ForgotPasswordTokenService {
  createForgotPasswordToken(forgotPasswordPayload: ForgotPasswordPayload): Promise<string>
  validateForgotPasswordToken(forgotPassword: string): Promise<boolean>
  decodeForgotPasswordToken(forgotPasswordToken: string): Promise<ForgotPasswordPayload>
}
