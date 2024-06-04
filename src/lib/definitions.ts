export type User = {
  id: string;
  email: string;
  passwordHash?: string;
  displayName?: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  email: string;
  password: string;
};

export type TokenInfoOutput = {
  accessToken: string;
};
