import { gql } from "@/__generated__";
import { CartFragment, OrderFragment, ProductFragment } from "./fragments";

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

export const GET_PRODUCT_DETAILS_QUERY = gql(`
  query getProductDetails($id: String!) {
    product(id: $id) {
      ...product
    }
  }
`);

export const SEARCH_PRODUCTS_BY_TERM_QUERY = gql(`
  query searchProductsByTerm($searchTerm: String) {
    searchProductsByTerm(searchTerm: $searchTerm) {
      ...product
    }
  }
`);

export const SEARCH_PRODUCTS_BY_CATEGORY_QUERY = gql(`
  query searchProductsByCategory($categoryId: Int) {
    searchProductsByCategory(categoryId: $categoryId) {
      ...product
    }
  }
`);

export const GET_CART_QUERY = gql(`
  query getCart {
    cart {
      ...cart
    }
  }
`);

export const ADD_PRODUCT_TO_CART_QUERY = gql(`
  mutation addProductToCart($productId: String!) {
    addProductToCart(productId: $productId) {
      ...cart
    }
  }
`);

export const CHANGE_CART_PRODUCT_QUANTITY_QUERY = gql(`
  mutation changeCartProductQuantity($productId: String!, $quantity: Int!) {
    changeCartProductQuantity(productId: $productId, quantity: $quantity) {
      ...cart
    }
  }
`);

export const GET_ORDER_QUERY = gql(`
  query getOrder($id: String!) {
    order(id: $id) {
      ...order
    }
  }
`);

export const CREATE_ORDER_QUERY = gql(`
  mutation createOrder {
    createOrder {
      ...order
    }
  }
`);
