import { GoogleAuthResponseDto } from "../dtos/authentication";

export interface GoogleValidatorService {
  decodeUserTokenFromGoogle(externalToken: string): Promise<GoogleAuthResponseDto>
}
