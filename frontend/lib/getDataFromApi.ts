import { USER_WITHDRAW_REQ_ADMIN } from "./../resolvers/withdraw/query";
/* eslint-disable react-hooks/rules-of-hooks */
import { GET_PRODUCT_QUERY } from "../resolvers/product/query";
import { useQuery } from "@apollo/client";

export const getProductByCategory = (
  take = 6,
  skip = 0,
  category: any,
  search = ""
) => {
  console.log(take, skip, category, search);

  const { data, error, loading } = useQuery(GET_PRODUCT_QUERY, {
    variables: { take, skip, category, search },
  });
  return { data, error, loading };
};

export const getWithdrawHistory = (take = 10, skip = 0, search = "") => {
  console.log(take, skip, search);

  const { data, error, loading } = useQuery(USER_WITHDRAW_REQ_ADMIN, {
    variables: { take, skip, search },
  });
  return { data, error, loading };
};
