import { gql } from "@apollo/client";

export const PARCEL_LIST_QUERY_FOR_USER = gql`
  query PARCEL_LIST_QUERY_FOR_USER(
    $userId: ID!
    $search: String
    $skip: Int
    $take: Int
  ) {
    parcelsCount(
      where: {
        user: { id: { equals: $userId } }
        phoneNumber: { contains: $search }
      }
    )
    parcels(
      where: {
        user: { id: { equals: $userId } }
        phoneNumber: { contains: $search }
      }
      skip: $skip
      take: $take
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
  query PARCEL_LIST_QUERY_FOR_ADMIN($search: String, $skip: Int, $take: Int) {
    parcelsCount(where: { phoneNumber: { contains: $search } })
    parcels(
      where: { phoneNumber: { contains: $search } }
      skip: $skip
      take: $take
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

export const PENDING_PARCEL_COUNT = gql`
  query {
    parcelsCount(where: { status: { equals: "pending" } })
  }
`;
