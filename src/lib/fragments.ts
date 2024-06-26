import { gql } from "@/__generated__/gql";

export const MetadataFragment = gql(`
  fragment Metadata on Metadata {
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
  }`);

export const PaginatedProductFragment = gql(`
  fragment PaginatedProduct on PaginatedProduct {
    edges {
      node {
        ...Product
      }
      cursor
    }
    pageInfo {
      hasMore
    }
    searchInfo {
      total
      availableBrands {
        brand
        count
      }
      availableCategories {
        categoryId
        count
      }
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
    local
    peak
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
    date
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

export const UserFragment = gql(`
  fragment User on User {
    id
    email
    displayName
  }
  `);
