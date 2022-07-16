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
