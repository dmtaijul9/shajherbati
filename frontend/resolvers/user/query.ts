import { gql } from "@apollo/client";

export const ME = gql`
  query ME {
    authenticatedItem {
      ... on User {
        id
        email
        name
      }
    }
  }
`;
