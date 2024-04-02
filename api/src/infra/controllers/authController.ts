import { Request, Response } from "express";
import {
  LoginDto,

} from "../../domain/dtos/authentication";
import { AuthenticationUseCase } from "../../use-cases/authenticationUseCase";

export class AuthController {
  constructor(private authUseCase: AuthenticationUseCase) {}

  public async login(
    req: Request<Record<string, unknown>, LoginDto>,
    res: Response
  ): Promise<void> {
    const email = req.body.email;
    const password = req.body.password;

    const { accessToken } = await this.authUseCase.login(email, password);

    res.cookie("refresh_token", { httpOnly: true });

    res.status(200).json({ accessToken });
  }
}
