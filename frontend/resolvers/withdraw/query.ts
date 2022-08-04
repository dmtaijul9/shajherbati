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
