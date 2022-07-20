import { gql } from "@apollo/client";

export const CREATE_PARCEL_MUTATION = gql`
  mutation CREATE_PARCEL_MUTATION(
    $name: String!
    $address: String!
    $phoneNumber: String!
    $sellPrice: Int!
    $deliveryCharge: Int!
    $shippingMethod: String!
    $parcelItems: [ProductInputForParcel!]
  ) {
    addToParcelList(
      name: $name
      address: $address
      deliveryCharge: $deliveryCharge
      phoneNumber: $phoneNumber
      sellPrice: $sellPrice
      shippingMethod: $shippingMethod
      parcelItems: $parcelItems
    ) {
      id

      user {
        name
      }
    }
  }
`;

export const CHANGE_PARCEL_STATUS_MUTATION = gql`
  mutation CHANGE_PARCEL_STATUS_MUTATION($parcelId: String!, $status: String!) {
    changeParcelStatus(parcelId: $parcelId, status: $status) {
      id

      user {
        name
      }
    }
  }
`;
