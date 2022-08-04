import { gql } from "@apollo/client";

export const USER_WITHDRAW_REQ = gql`
  query USER_WITHDRAW_REQ($userId: ID!) {
    withdraws(where: { user: { id: { equals: $userId } } }) {
      id
      amount
      bkashNumber
      status
      user {
        name
      }
      time
    }
  }
`;

export const USER_WITHDRAW_REQ_SIGNLE = gql`
  query USER_WITHDRAW_REQ_SIGNLE($id: ID!) {
    withdraw(where: { id: $id }) {
      amount
      bkashNumber
      status
      id
      time
      transationID
      user {
        name
        email
      }
    }
  }
`;
