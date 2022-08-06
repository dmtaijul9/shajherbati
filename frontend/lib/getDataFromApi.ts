import { PARCEL_LIST_QUERY_FOR_USER } from "./../resolvers/parcel/query";
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

export const getParcelListForUser = (
  take = 10,
  skip = 0,
  search = "",
  userId
) => {
  console.log(take, skip, search, userId);

  const { data, error, loading } = useQuery(PARCEL_LIST_QUERY_FOR_USER, {
    variables: { take, skip, search, userId },
  });
  return { data, error, loading };
};
