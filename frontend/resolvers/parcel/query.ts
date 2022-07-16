import { gql } from "@apollo/client";

export const PARCEL_LIST_QUERY_FOR_USER = gql`
  query PARCEL_LIST_QUERY_FOR_USER($userId: ID) {
    parcels(where: { user: { id: { equals: $userId } } }) {
      name
      phoneNumber
      status
      items {
        name
        imageUrl
        quantity
        price
      }
    }
  }
`;
