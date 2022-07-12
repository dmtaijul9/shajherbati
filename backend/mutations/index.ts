import { graphQLSchemaExtension } from "@keystone-6/core";
import addToCart from "./addToCart";

const graphql = String.raw;

export const extendGraphQlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
});
