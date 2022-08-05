import { GET_PRODUCT_QUERY } from "./../resolvers/product/query";
import { useQuery } from "@apollo/client";

export const getProductByCategory = (
  take = 6,
  skip = 0,
  category,
  search = ""
) => {
  console.log(take, skip, category, search);

  const { data, error, loading } = useQuery(GET_PRODUCT_QUERY, {
    variables: { take, skip, category, search },
  });
  return { data, error, loading };
};
