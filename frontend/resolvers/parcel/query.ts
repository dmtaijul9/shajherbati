import { gql } from "@apollo/client";

export const PARCEL_LIST_QUERY_FOR_USER = gql`
  query PARCEL_LIST_QUERY_FOR_USER($userId: ID) {
    parcels(
      where: { user: { id: { equals: $userId } } }
      orderBy: { createdAt: desc }
    ) {
      id
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
      id
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

export const SINGLE_PARCEL_QUERY = gql`
  query SINGLE_PARCEL_QUERY($id: ID) {
    parcel(where: { id: $id }) {
      id
      name
      phoneNumber
      shippingMethod
      status
      address
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
