export type LoginDto = {
  email: string
  password: string
};

export interface LoginResponseDto {
  accessToken: string
}

export type AccessPayload = {
  sub: string
  email: string
  name: string
  avatar: string
};
