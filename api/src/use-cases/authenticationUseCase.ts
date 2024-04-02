import { LoginResponseDto } from "../domain/dtos/authentication";
import { compare } from "../infra/encryption/encryption";
import { User } from "../domain/models/user";
import { UserRepository } from "../domain/ports/userRepository";
import { SessionsTokenService } from "../domain/ports/sessionTokenService";

export class AuthenticationUseCase {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionTokenService: SessionsTokenService

  ) {}

  public async login(email: string, senha: string): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      if (compare(senha, user.password)) {
        return await this.generateTokens(user);
      }
    }
    throw new Error("Invalid email or password");
  }

  private async generateTokens(user: User): Promise<LoginResponseDto> {
    const accessToken = {
      sub: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    };

    return await this.sessionTokenService.createSessionTokens(
      accessToken
    );
  }
}
