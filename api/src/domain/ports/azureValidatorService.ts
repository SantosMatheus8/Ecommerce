import { AzureAuthResponseDto } from "../dtos/authentication";

export interface AzureValidatorService {
  decodeUserTokenFromAzure(externalToken: string): Promise<AzureAuthResponseDto>
}
