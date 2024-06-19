import { gql } from "@/__generated__";

export const GetCategoriesQuery = gql(`
  query getCategories {
    metadata {
      ...Metadata
    }
  }
`);

export const GetProductDetailsQuery = gql(`
  query getProductDetails($id: String!) {
    product(id: $id) {
      ...Product
    }
  }
`);

export const SearchProductsQuery = gql(`
  query searchProducts($input: SearchProductsInput!, $first: Int, $after: String) {
    searchProducts(input: $input, first: $first, after: $after) {
      ...PaginatedProduct
    }
  }
`);

export const GetCartQuery = gql(`
  query getCart {
    cart {
      ...Cart
    }
  }
`);

export const ChangeCartProductQuantityMutation = gql(`
  mutation changeCartProductQuantity($productId: String!, $quantity: Int!) {
    changeCartProductQuantity(productId: $productId, quantity: $quantity) {
      ...Cart
    }
  }
`);

export const GetOrderQuery = gql(`
  query getOrder($id: String!) {
    order(id: $id) {
      ...Order
    }
  }
`);

export const GetOrdersByUserQuery = gql(`
  query getOrdersByUser {
    ordersByUser {
      ...Order
    }
  }
`);

export const CreateOrderMutation = gql(`
  mutation createOrder {
    createOrder {
      ...Order
    }
  }
`);

export const UpdateUserMutation = gql(`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ...User
    }
  }
`);
