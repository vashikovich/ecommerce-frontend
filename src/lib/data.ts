import { gql } from "@apollo/client";
import createApolloClient from "./apollo-client";
import { Cart, Category, Metadata, Order, Product } from "./definitions";
import { CART_FRAGMENT, ORDER_FRAGMENT, PRODUCT_FRAGMENT } from "./queries";

const client = createApolloClient();

export async function getCategories(): Promise<Category[]> {
  const result = await client.query<{ metadata: Metadata }>({
    query: gql`
      {
        metadata {
          categories {
            id
            name
            image
            subcategories {
              id
              name
              image
            }
          }
        }
      }
    `,
  });
  return result.data.metadata.categories;
}

export async function getProductDetails(id: string): Promise<Product[]> {
  const result = await client.query<Product[]>({
    query: gql`
      ${PRODUCT_FRAGMENT}
      {
        product(id: $id) {
          ...product
        }
      }
    `,
    variables: { id },
  });
  return result.data;
}

export async function searchProducts(searchTerm: string): Promise<Product[]> {
  const result = await client.query<Product[]>({
    query: gql`
      ${PRODUCT_FRAGMENT}
      {
        searchProducts(searchTerm: $searchTerm) {
          ...product
        }
      }
    `,
    variables: { searchTerm },
  });
  return result.data;
}

export async function getCart(userId: string): Promise<Cart> {
  const result = await client.query<Cart>({
    query: gql`
      ${CART_FRAGMENT}
      {
        cart {
          ...cart
        }
      }
    `,
  });
  return result.data;
}

export async function addProductToCart(productId: string): Promise<Cart> {
  const cart = await client.mutate<Cart>({
    mutation: gql`
      ${CART_FRAGMENT}
      mutation {
        addProductToCart(productId: $productId) {
          ...cart
        }
      }
    `,
    variables: { productId },
  });
  return cart.data as Cart;
}

export async function changeCartProductQuantity(
  productId: string,
  quantity: number
): Promise<Cart> {
  const cart = await client.mutate<Cart>({
    mutation: gql`
      ${CART_FRAGMENT}
      mutation {
        changeCartProductQuantity(productId: $productId, quantity: $quantity) {
          ...cart
        }
      }
    `,
    variables: { productId, quantity },
  });
  return cart.data as Cart;
}

export async function getOrder(id: string): Promise<Order> {
  const result = await client.query<Order>({
    query: gql`
      ${ORDER_FRAGMENT}
      {
        order(id: $id) {
          ...order
        }
      }
    `,
    variables: { id },
  });
  return result.data;
}

export async function getOrders(): Promise<Order> {
  const result = await client.query<Order>({
    query: gql`
      ${ORDER_FRAGMENT}
      {
        ordersByUser() {
          ...order
        }
      }
    `,
  });
  return result.data;
}

export async function createOrder(): Promise<Order> {
  const result = await client.mutate<Order>({
    mutation: gql`
      ${ORDER_FRAGMENT}
      {
        createOrder() {
          ...order
        }
      }
    `,
  });
  return result.data as Order;
}
