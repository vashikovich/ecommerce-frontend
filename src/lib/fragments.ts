import { gql } from "@/__generated__/gql";

export const ProductFragment = gql(`
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
`);

export const CartFragment = gql(`
  ${ProductFragment}
  fragment cart on Cart {
    userId
    items {
      productId
      quantity
      product {
        ...product
      }
    }
  }
`);

export const OrderFragment = gql(`
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
`);
