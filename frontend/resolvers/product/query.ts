import { gql } from "@apollo/client";

export const QUERY_PRODUCT_HOME = gql`
  query {
    products {
      id
      name
      slug
      productImg {
        altText
        image {
          url
        }
      }
      brand
      price
    }
  }
`;
