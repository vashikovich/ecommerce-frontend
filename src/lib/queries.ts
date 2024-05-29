import { gql } from "@apollo/client";

export const PRODUCT_FRAGMENT = gql`
  fragment product on Product {
    id
    name
    brand
    price
    size
    ingredients
    origin
    imageUrls {
      thumbnail
      small
      original
    }
    categoryIds
  }
`;

export const CART_FRAGMENT = gql`
  ${PRODUCT_FRAGMENT}
  fragment cart on Cart {
    userId
    items {
      productId
      quantity
      ...product
    }
  }
`;

export const ORDER_FRAGMENT = gql`
  fragment order on Order {
    id
    userId
    totalAmount
    status
    items {
      productId
      name
      brand
      size
      imageUrl
      unitPrice
      quantity
    }
  }
`;
