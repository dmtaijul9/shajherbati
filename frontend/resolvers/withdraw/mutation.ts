import { gql } from "@apollo/client";

export const WITHDRAW_REQUEST_MUTATION = gql`
  mutation WITHDRAW_REQUEST_MUTATION($amount: Int!, $bkashNumber: String!) {
    withdrawRequest(amount: $amount, bkashNumber: $bkashNumber) {
      amount
      bkashNumber
    }
  }
`;
