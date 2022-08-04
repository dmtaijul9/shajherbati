import { graphQLSchemaExtension } from "@keystone-6/core";
import addToParcelList from "./addToParcelList";
import changeParcelStatus from "./changeParcelStatus";
import withdrawRequest from "./withdrawRequest";

const graphql = String.raw;

export const extendGraphQlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    input ProductInputForParcel {
      name: String!
      imageUrl: String!
      price: Int!
      quantity: Int!
    }
    type Mutation {
      addToParcelList(
        name: String!
        address: String!
        deliveryCharge: Int!
        phoneNumber: String!
        sellPrice: Int!
        shippingMethod: String!
        parcelItems: [ProductInputForParcel!]
      ): Parcel

      changeParcelStatus(status: String!, parcelId: String!): Parcel

      withdrawRequest(amount: Int!, bkashNumber: String!): Withdraw
    }
  `,
  resolvers: {
    Mutation: {
      addToParcelList,
      changeParcelStatus,
      withdrawRequest,
    },
  },
});
