import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $bkash: String!
    $fbPageName: String!
    $address: String!
  ) {
    createUser(
      data: {
        email: $email
        name: $name
        password: $password
        address: $address
        fbPageName: $fbPageName
        bkash: $bkash
      }
    ) {
      id
      email
      name
    }
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation LOGOUT {
    endSession
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation REQUEST_PASSWORD_RESET($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD(
    $password: String!
    $token: String!
    $email: String!
  ) {
    redeemUserPasswordResetToken(
      token: $token
      password: $password
      email: $email
    ) {
      message
      code
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $name: String
    $password: String
    $bkashNumber: String
    $fbPageName: String
    $email: String
    $address: String
    $id: ID!
  ) {
    updateUser(
      where: { id: $id }
      data: {
        name: $name
        password: $password
        email: $email
        bkash: $bkashNumber
        fbPageName: $fbPageName
        address: $address
      }
    ) {
      id
    }
  }
`;
