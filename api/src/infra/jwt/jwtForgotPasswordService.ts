import { ForgotPasswordPayload } from "../../domain/dtos/authentication";
import { ForgotPasswordTokenService } from "../../domain/ports/forgotPasswordService";

import { sign, verify } from "jsonwebtoken";

export class JwtForgotPasswordService implements ForgotPasswordTokenService {
  constructor(private jwtSecret: string) {}

  async createForgotPasswordToken(forgotPasswordPayload: ForgotPasswordPayload): Promise<string> {
    return sign(forgotPasswordPayload, this.jwtSecret, { expiresIn: "3m" });
  }

  async validateForgotPasswordToken(forgotPassword: string): Promise<boolean> {
    return await this.verifyToken(forgotPassword);
  }

  async decodeForgotPasswordToken(forgotPasswordToken: string): Promise<any> {
    return verify(forgotPasswordToken, this.jwtSecret);
  }

  private async verifyToken(token: string): Promise<boolean> {
    try {
      verify(token, this.jwtSecret);
      return true;
    } catch (error) {
      return false;
    }
  }
}
