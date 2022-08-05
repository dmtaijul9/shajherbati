import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import { getProductByCategory } from "../lib/getProductByCategory";
import { useForm } from "../lib/hooks/useForm";

const lehenga = () => {
  const [take, setTake] = useState(8);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { inputs, handleChange } = useForm({
    search: "",
  });

  const { data, error, loading } = getProductByCategory(
    take,
    skip,
    "unstichedDress",
    search
  );

  const handleSubmit = () => {
    setSearch(inputs.search);
  };

  const pageCount = Math.ceil(data?.productsCount / take);
  console.log(pageCount);
  return (
    <Layout title="Lehenga">
      <section>
        <div className="flex flex-wrap items-center justify-between pb-4 mb-5 text-2xl font-bold border-b-2 border-amber-400">
          <div>
            {" "}
            <h1>Lehenga</h1>
          </div>

          <div className="flex justify-center">
            <div className="xl:w-96">
              <div className="relative flex items-stretch w-full input-group">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  name="search"
                  value={inputs.search}
                  onChange={handleChange}
                />
                <button
                  className="btn inline-block px-6 py-2.5 bg-amber-400 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-amber-500 hover:shadow-lg focus:bg-amber-500  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                  type="button"
                  id="button-addon2"
                  onClick={handleSubmit}
                >
                  <SearchIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
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

export default lehenga;
