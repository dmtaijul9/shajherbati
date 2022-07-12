import { useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";

import { QUERY_PRODUCT_HOME } from "../resolvers/product/query";

export default function Home({ products }: any) {
  const { data, loading, error } = useQuery(QUERY_PRODUCT_HOME);

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {data?.products.map((product, index) => {
          return <ProductItem product={product} key={index} />;
        })}
      </div>
    </Layout>
  );
}
