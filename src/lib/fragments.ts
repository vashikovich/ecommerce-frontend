import { gql } from "@/__generated__/gql";

export const PaginatedProduct = gql(`
  fragment PaginatedProduct on PaginatedProduct {
    edges {
      node {
        ...Product
      }
      cursor
    }
  }
`);

export const ProductFragment = gql(`
  fragment Product on Product {
    id
    name
    brand
    price
    size
    stock
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
  fragment Cart on Cart {
    userId
    items {
      productId
      quantity
      product {
        ...Product
      }
    }
  }
`);

export const OrderFragment = gql(`
  fragment Order on Order {
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
