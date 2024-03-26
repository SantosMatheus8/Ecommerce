import {
  RefreshPayload,
  AccessPayload,
} from "../../domain/dtos/authentication";
import { SessionsTokenService } from "../../domain/ports/sessionTokenService";

import { verify, sign } from "jsonwebtoken";

export class JwtSessionTokenService implements SessionsTokenService {
  constructor(private jwtSecret: string) {}

  async createAccessToken(accessTokenPayload: AccessPayload): Promise<{ accessToken: string }> {
    const accessToken = sign(accessTokenPayload, this.jwtSecret, {
      expiresIn: "15m",
    });
    return {
      accessToken,
    };
  }

  async validateAccessToken(accessToken: string): Promise<boolean> {
    return await this.verifyToken(accessToken);
  }

  async validateRefreshToken(refreshToken: string): Promise<boolean> {
    return await this.verifyToken(refreshToken);
  }

  async createSessionTokens(accessPayload: AccessPayload, refreshPayload: RefreshPayload): Promise<{ accessToken: string, refreshToken: string }> {
    const accessToken = sign(accessPayload, this.jwtSecret, {
      expiresIn: "15m",
    });
    const refreshToken = sign(refreshPayload, this.jwtSecret, {
      expiresIn: "24h",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async decodeAccessToken(accessToken: string): Promise<any> {
    return verify(accessToken, this.jwtSecret);
  }

  async decodeRefreshToken(refreshToken: string): Promise<any> {
    return verify(refreshToken, this.jwtSecret);
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
