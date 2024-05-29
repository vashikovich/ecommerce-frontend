export type ImageUrl = {
  thumbnail: string;
  small: string;
  original: string;
};

export type Product = {
  id: string;
  name: string;
  brand?: string;
  price: number;
  size: string;
  stock?: number;
  description?: string;
  ingredients?: string;
  origin: string;
  imageUrls: ImageUrl[];
  categoryIds: number[];
};

export type User = {
  id: string;
  email: string;
  passwordHash?: string;
  displayName?: string;
};

export type UpdateUserInput = {
  displayName?: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  brand?: string;
  size: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
  product?: Product;
};

export type Cart = {
  userId: string;
  items: CartItem[];
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
