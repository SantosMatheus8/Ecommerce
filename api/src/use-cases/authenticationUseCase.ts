import { LoginResponseDto } from "../domain/dtos/authentication";
import { compare, hash } from "../infra/encryption/encryption";
import { User } from "../domain/models/user";
import { UserRepository } from "../domain/ports/userRepository";
import { ForgotPasswordTokenService } from "../domain/ports/forgotPasswordService";
import { SessionsTokenService } from "../domain/ports/sessionTokenService";
import { GoogleValidatorService } from "../domain/ports/googleValidatorService";
import { AzureValidatorService } from "../domain/ports/azureValidatorService";
import { EventProducer } from "../domain/ports/eventProducer";

export class AuthenticationUseCase {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly forgotPasswordTokenService: ForgotPasswordTokenService,
    private readonly sessionTokenService: SessionsTokenService,
    private readonly googleValidatorService: GoogleValidatorService,
    private readonly azureValidatorService: AzureValidatorService,
    private readonly eventProducer: EventProducer
  ) {}

  public async login(email: string, senha: string): Promise<LoginResponseDto> {
    const user = await this.userRepository.findActiveByEmail(email);
    if (user) {
      if (compare(senha, user.password)) {
        return await this.generateTokens(user);
      }
    }
    throw new Error("Invalid email or password");
  }

  public async changePassword(newPassword: string, token: string): Promise<void> {
    const { sub } = await this.forgotPasswordTokenService.decodeForgotPasswordToken(token);
    const user = await this.userRepository.findOneBy({ id: sub });
    user.password = hash(newPassword);
    await this.userRepository.update(user);
  }

  public async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepository.findActiveByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    await this.eventProducer.sendMessage("user-forgot-password", user);
  }

  public async refreshToken(refreshToken: string): Promise<LoginResponseDto> {
    const { sub } = await this.sessionTokenService.decodeRefreshToken(refreshToken);
    if (sub === undefined) throw new Error("Invalid refresh token");

    const user = await this.userRepository.findOneBy({ id: sub });

    if (user) {
      return await this.generateTokens(user);
    }
    throw new Error("User not found");
  }

  public async loginGoogle(accessToken: string): Promise<LoginResponseDto> {
    const { email } = await this.googleValidatorService
      .decodeUserTokenFromGoogle(accessToken);
    const user = await this.userRepository.findActiveByEmail(email);
    if (user) {
      return await this.generateTokens(user);
    }
    throw new Error("Invalid user credentials");
  }

  public async loginAzure(accessToken: string): Promise<LoginResponseDto> {
    const { userPrincipalName: email } = await this.azureValidatorService
      .decodeUserTokenFromAzure(accessToken);
    const user = await this.userRepository.findActiveByEmail(email);
    if (user) {
      return await this.generateTokens(user);
    }
    throw new Error("Invalid user credentials");
  }

  private async generateTokens(user: User): Promise<LoginResponseDto> {
    const refreshToken = {
      sub: user.id,
    };

    const accessToken = {
      sub: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      featureIds: [],
    };

    return await this.sessionTokenService.createSessionTokens(
      accessToken,
      refreshToken
    );
  }
}
