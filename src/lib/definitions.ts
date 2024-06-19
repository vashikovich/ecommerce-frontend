export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  displayName?: string;
};

export type TokenInfo = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = {
  user: User;
  tokenInfo: TokenInfo;
} & ErrorResponse;

export type ErrorResponse = {
  error: string;
  message: string;
};
