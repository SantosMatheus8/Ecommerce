import { Request, Response } from "express";
import {
  LoginDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginGoogleDto,
  LoginAzureDto,
} from "../../domain/dtos/authentication";
import { AuthenticationUseCase } from "../../use-cases/authenticationUseCase";
import { getParsedCookie } from "../../domain/shared/helpers/getParsedCookie";

export class AuthController {
  constructor(private authUseCase: AuthenticationUseCase) {}

  public async login(
    req: Request<Record<string, unknown>, LoginDto>,
    res: Response
  ): Promise<void> {
    const email = req.body.email;
    const password = req.body.password;

    const { accessToken, refreshToken } = await this.authUseCase.login(email, password);

    res.cookie("refresh_token", refreshToken, { httpOnly: true });

    res.status(200).json({ accessToken, refreshToken });
  }

  public async changePassword(
    req: Request<Record<string, unknown>, ChangePasswordDto>,
    res: Response
  ): Promise<void> {
    const newPassword = req.body.newPassword;
    const token = req.body.token;

    await this.authUseCase.changePassword(newPassword, token);

    res.status(200).send();
  }

  public async forgotPassword(
    req: Request<Record<string, unknown>, ForgotPasswordDto>,
    res: Response
  ): Promise<any> {
    const resetPasswordLink = await this.authUseCase.forgotPassword(req.body.email);

    res.status(200).json(resetPasswordLink);
  }

  public async refreshToken(
    req: Request,
    res: Response
  ): Promise<any> {
    const refreshToken = getParsedCookie(req.headers.cookie);

    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let sessionTokens;

    try {
      sessionTokens = await this.authUseCase.refreshToken(refreshToken);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }

    res.status(200).json(sessionTokens);
  }

  public async loginGoogle(
    req: Request<Record<string, unknown>, LoginGoogleDto>,
    res: Response
  ): Promise<void> {
    const externalToken = req.body.externalToken;
    const { accessToken, refreshToken } = await this.authUseCase.loginGoogle(externalToken);

    res.cookie("refresh_token", refreshToken, { httpOnly: true });

    res.status(200).json({ accessToken, refreshToken });
  }

  public async loginAzure(
    req: Request<Record<string, unknown>, LoginAzureDto>,
    res: Response
  ): Promise<void> {
    const externalToken = req.body.externalToken;
    const { accessToken, refreshToken } = await this.authUseCase.loginAzure(externalToken);
    res.cookie("refresh_token", refreshToken, { httpOnly: true });

    res.status(200).json({ accessToken, refreshToken });
  }
}
