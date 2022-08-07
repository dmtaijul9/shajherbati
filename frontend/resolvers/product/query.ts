import { gql } from "@apollo/client";

export const QUERY_PRODUCT_WOMENS_FASHION = gql`
  query {
    products(
      where: { category: { equals: "womensFashion" } }
      take: 8
      skip: 0
    ) {
      id
      name
      category
      productImg {
        image {
          url
        }
      }
      brand
      price
    }
  }
`;

export const GET_PRODUCT_QUERY = gql`
  query GET_PRODUCT_QUERY(
    $take: Int
    $skip: Int
    $category: String
    $search: String
  ) {
    productsCount(
      where: { name: { contains: $search }, category: { equals: $category } }
    )
    products(
      take: $take
      skip: $skip
      orderBy: { createdAt: desc }
      where: { name: { contains: $search }, category: { equals: $category } }
    ) {
      name
      category
      createdAt
      price
      id
      brand
      countInStock
      description
      productImg {
        image {
          url
        }
      }
    }
  }
`;

export const QUERY_PRODUCT_PANJABI = gql`
  query {
    products(where: { category: { equals: "panjabi" } }, take: 4, skip: 0) {
      id
      name
      category
      productImg {
        image {
          url
        }
      }
      brand
      price
    }
  }
`;

export const QUERY_PRODUCT_TSHIRT = gql`
  query {
    products(where: { category: { equals: "tShirt" } }, take: 4, skip: 0) {
      id
      name
      category
      productImg {
        image {
          url
        }
      }
      brand
      price
    }
  }
`;

export const QUERY_PRODUCT_CAMPAIGN = gql`
  query {
    products(where: { category: { equals: "campaign" } }, take: 4, skip: 0) {
      id
      name
      category
      productImg {
        image {
          url
        }
      }
      brand
      price
    }
  }
`;
