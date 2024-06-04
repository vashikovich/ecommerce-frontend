import { gql } from "@/__generated__";

export const GetCategoriesQuery = gql(`
  query getCategories {
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
`);

export const GetProductDetailsQuery = gql(`
  query getProductDetails($id: String!) {
    product(id: $id) {
      ...Product
    }
  }
`);

export const SearchProductsByTermQuery = gql(`
  query searchProductsByTerm($searchTerm: String!, $first: Int, $after: String) {
    searchProductsByTerm(searchTerm: $searchTerm, first: $first, after: $after) {
      ...PaginatedProduct
    }
  }
`);

export const SearchProductsByCategoryQuery = gql(`
  query searchProductsByCategory($categoryId: Int!, $first: Int, $after: String) {
    searchProductsByCategory(categoryId: $categoryId, first: $first, after: $after) {
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

export const AddProductToCartQuery = gql(`
  mutation addProductToCart($productId: String!) {
    addProductToCart(productId: $productId) {
      ...Cart
    }
  }
`);

export const ChangeCartProductQuantityQuery = gql(`
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

export const CreateOrderQuery = gql(`
  mutation createOrder {
    createOrder {
      ...Order
    }
  }
`);
