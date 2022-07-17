import { gql } from "@apollo/client";

export const PARCEL_LIST_QUERY_FOR_USER = gql`
  query PARCEL_LIST_QUERY_FOR_USER($userId: ID) {
    parcels(
      where: { user: { id: { equals: $userId } } }
      orderBy: { createdAt: desc }
    ) {
      name
      phoneNumber
      status
      sellPrice
      deliveryCharge

      items {
        name
        imageUrl
        quantity
        price
      }
    }
  }
`;

export const PARCEL_LIST_QUERY_FOR_ADMIN = gql`
  query {
    parcels(orderBy: { createdAt: desc }) {
      name
      phoneNumber
      status
      sellPrice
      deliveryCharge

      items {
        name
        imageUrl
        quantity
        price
      }
    }
  }
`;
