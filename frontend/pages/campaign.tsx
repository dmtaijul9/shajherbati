import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import ProductItem from "../components/ProductItem";
import { getProductByCategory } from "../lib/getDataFromApi";
import { useForm } from "../lib/hooks/useForm";

const campaign = () => {
  const [take, setTake] = useState(8);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, error, loading } = getProductByCategory(
    take,
    skip,
    "campaign",
    search
  );

  const { inputs, handleChange } = useForm({
    search: "",
  });

  const handleSubmit = () => {
    setSearch(inputs.search);
  };

  const pageCount = Math.ceil(data?.productsCount / take);

  return (
    <Layout title="T-Shirt">
      <section>
        <div className="flex flex-wrap items-center justify-between pb-4 mb-5 text-2xl font-bold border-b-2 border-amber-400">
          <div>
            {" "}
            <h1>Campaign</h1>
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
          <div>There Have No campaign now. Please Stay Us. </div>
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
            <Pagination
              skip={skip}
              take={take}
              page={page}
              pageCount={pageCount}
              setSkip={setSkip}
              setPage={setPage}
            />
          </>
        )}
      </section>
    </Layout>
  );
};

export default campaign;
