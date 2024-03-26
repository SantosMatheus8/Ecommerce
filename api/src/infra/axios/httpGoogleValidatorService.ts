import axios from "axios";
import { GoogleValidatorService } from "../../domain/ports/googleValidatorService";
import { GoogleAuthResponseDto } from "../../domain/dtos/authentication";

export class HttpGoogleValidatorService implements GoogleValidatorService {
  constructor(private readonly authenticationUrl: string) {}
  async decodeUserTokenFromGoogle(externalToken: string): Promise<GoogleAuthResponseDto> {
    try {
      const { data } = await axios.get<GoogleAuthResponseDto>(this.authenticationUrl, {
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
