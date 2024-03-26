import axios from "axios";
import { AzureValidatorService } from "../../domain/ports/azureValidatorService";
import { AzureAuthResponseDto } from "../../domain/dtos/authentication";

export class HttpAzureValidatorService implements AzureValidatorService {
  constructor(private readonly authenticationUrl: string) {}
  async decodeUserTokenFromAzure(externalToken: string): Promise<AzureAuthResponseDto> {
    try {
      const { data } = await axios.get<AzureAuthResponseDto>(this.authenticationUrl, {
        headers: {
          Authorization: `Bearer ${externalToken}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
