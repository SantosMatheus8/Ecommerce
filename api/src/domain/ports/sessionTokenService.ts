import { AccessPayload, RefreshPayload } from "../dtos/authentication";

export interface SessionsTokenService {
  createAccessToken(accessToken: AccessPayload): Promise<{ accessToken: string }>
  validateAccessToken(accessToken: string): Promise<boolean>
  validateRefreshToken(refreshToken: string): Promise<boolean>
  createSessionTokens(accessPayload: AccessPayload, refreshPayload: RefreshPayload): Promise<{ accessToken: string, refreshToken: string }>
  decodeRefreshToken(refreshToken: string): Promise<RefreshPayload>
  decodeAccessToken(accessToken: string): Promise<AccessPayload>
}
