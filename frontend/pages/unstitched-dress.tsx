import React, { useState } from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import { getProductByCategory } from "../lib/getProductByCategory";

const unstitchedDress = () => {
  const [take, setTake] = useState(8);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, error, loading } = getProductByCategory(
    take,
    skip,
    "unstichedDress",
    search
  );

  const pageCount = Math.ceil(data?.productsCount / take);
  console.log(pageCount);
  return (
    <Layout title="Unstitched Dress">
      {" "}
      <section>
        <div className="pb-4 mb-5 text-2xl font-bold text-center border-b-2 border-amber-400">
          <h1>Unstitched Dress</h1>
        </div>
        {data?.productsCount <= 0 ? (
          <div>There have no product in this category</div>
        ) : (
          <>
            {" "}
            <div>
              <div id="womensFashion" className="py-10 ">
                <div className="container m-auto">
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
                    {data?.products.map((product: any, index: number) => {
                      return <ProductItem product={product} key={index} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between max-w-md pt-5 pb-10 m-auto">
              <div>
                <button
                  className="primary-button disabled:bg-gray-200"
                  onClick={() => {
                    setSkip(skip - take);
                    setPage(page - 1);
                  }}
                  disabled={skip <= 0}
                >
                  Prev-
                </button>
              </div>
              <div> 1 out of 20 </div>
              <div>
                <button
                  className="primary-button disabled:bg-gray-200"
                  disabled={pageCount == page}
                  onClick={() => {
                    setSkip(skip + take);
                    setPage(page + 1);
                  }}
                >
                  -Next
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default unstitchedDress;
