import { gql } from "@apollo/client";

export const QUERY_PRODUCT_WOMENS_FASHION = gql`
  query {
    products(
      where: { category: { equals: "womens-fashion" } }
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
