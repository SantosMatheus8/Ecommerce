import {
  AccessPayload,
} from "../../domain/dtos/authentication";
import { SessionsTokenService } from "../../domain/ports/sessionTokenService";

import { sign } from "jsonwebtoken";

export class JwtSessionTokenService implements SessionsTokenService {
  constructor(private jwtSecret: string) {}

  async createSessionTokens(accessPayload: AccessPayload): Promise<{ accessToken: string }> {
    const accessToken = sign(accessPayload, this.jwtSecret, {
      expiresIn: "15m",
    });

    return {
      accessToken,
    };
  }
}
