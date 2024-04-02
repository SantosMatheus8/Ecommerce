import { AccessPayload } from "../dtos/authentication";

export interface SessionsTokenService {
  createSessionTokens(accessPayload: AccessPayload): Promise<{ accessToken: string }>
}
