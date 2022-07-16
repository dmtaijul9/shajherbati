import { graphQLSchemaExtension } from "@keystone-6/core";
import addToParcelList from "./addToParcelList";

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
    }
  `,
  resolvers: {
    Mutation: {
      addToParcelList,
    },
  },
});
