export type ChangePasswordDto = {
  newPassword: string
  token: string
};

export type ForgotPasswordDto = {
  email: string
};

export type LoginDto = {
  email: string
  password: string
};

export interface LoginResponseDto {
  accessToken: string
  refreshToken: string
}

export type LoginGoogleDto = {
  externalToken: string
};

export type GoogleAuthResponseDto = {
  email: string
};

export type LoginAzureDto = {
  externalToken: string
};

export type AzureAuthResponseDto = {
  userPrincipalName: string
};

export type AccessPayload = {
  sub: number
  email: string
  name: string
  avatar: string
  featureIds: number[]
};

export type RefreshPayload = {
  sub: number
};

export type ForgotPasswordPayload = {
  sub: number
};
