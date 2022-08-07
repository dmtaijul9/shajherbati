import { gql } from "@apollo/client";

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $category: String!
    $price: Float!
    $brand: String
    $countInStock: Float!
    $description: String!
    $productImg: Upload!
    $userId: ID!
  ) {
    createProduct(
      data: {
        name: $name
        category: $category
        price: $price
        brand: $brand
        countInStock: $countInStock
        description: $description
        user: { connect: { id: $userId } }
        productImg: { create: [{ image: { upload: $productImg } }] }
      }
    ) {
      category
      name
    }
  }
`;
