import { gql } from "@apollo/client";

export const USER_WITHDRAW_REQ = gql`
  query USER_WITHDRAW_REQ($userId: ID!, $skip: Int) {
    withdrawsCount(where: { user: { id: { equals: $userId } } })
    withdraws(
      where: { user: { id: { equals: $userId } } }
      take: 10
      skip: $skip
      orderBy: { time: desc }
    ) {
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

export const USER_WITHDRAW_REQ_ADMIN = gql`
  query USER_WITHDRAW_REQ_ADMIN($take: Int, $skip: Int, $search: String) {
    withdraws(
      where: { bkashNumber: { contains: $search } }
      take: $take
      skip: $skip
      orderBy: { time: desc }
    ) {
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
