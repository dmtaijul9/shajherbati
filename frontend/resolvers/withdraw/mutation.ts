import { gql } from "@apollo/client";

export const WITHDRAW_REQUEST_MUTATION = gql`
  mutation WITHDRAW_REQUEST_MUTATION($amount: Int!, $bkashNumber: String!) {
    withdrawRequest(amount: $amount, bkashNumber: $bkashNumber) {
      amount
      bkashNumber
    }
  }
`;

export const UPDATE_WITHDRAW_MUATION = gql`
  mutation WITHDRAW_REQUEST_MUTATION($transationID: String!, $id: ID!) {
    updateWithdraw(
      where: { id: $id }
      data: { transationID: $transationID, status: "done" }
    ) {
      status
      transationID
    }
  }
`;
