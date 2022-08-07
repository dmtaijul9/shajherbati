/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@apollo/client";
import { SearchIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import { getParcelListForUser } from "../../lib/getDataFromApi";
import { useForm } from "../../lib/hooks/useForm";
import useUser from "../../lib/hooks/useUser";
import { PARCEL_LIST_QUERY_FOR_USER } from "../../resolvers/parcel/query";

const orderHistoryScreen = () => {
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);
  const [search, setSearch] = useState("");

  const user = useUser();
  const router = useRouter();

  const { data, loading, error } = getParcelListForUser(
    take,
    skip,
    search,
    user?.id
  );
  const { inputs, handleChange } = useForm({
    search: "",
  });
  const handleSubmit = () => {
    setSearch(inputs.search);
  };

  const pageCount = Math.ceil(data?.parcelsCount / take);

  if (loading) {
    return (
      <Layout title="order history">
        <div className="flex items-center justify-center">
          <div
            className="inline-block w-8 h-8 border-4 rounded-full spinner-border animate-spin"
            role="status"
          ></div>
        </div>
      </Layout>
    );
  } else if (data?.parcels.length === 0) {
    return (
      <Layout title="order history">
        <div className="flex flex-wrap items-center justify-between pb-4 mb-5 text-2xl font-bold border-b-2 border-amber-400">
          <div>
            {" "}
            <h1>Parcel Ordered</h1>
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
      </Layout>
    );
  }

  return (
    <Layout title="order history">
      <section>
        <div className="flex flex-wrap items-center justify-between pb-4 mb-5 text-2xl font-bold border-b-2 border-amber-400">
          <div>
            {" "}
            <h1>Withdrawn List</h1>
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
        <div>
          {" "}
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-2 text-left">Name</th>
                <th className="px-2 text-center">Phone Number</th>

                <th className="px-2 text-center">Total Quantity</th>
                <th className="px-2 text-right">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {data?.parcels.map((item, index) => (
                <tr
                  key={index}
                  className="border-b"
                  onClick={() => {
                    router.push(`/parcelview/${item.id}`);
                  }}
                >
                  <td className="px-2 py-5 text-left">{item.name}</td>
                  <td className="px-2 py-5 text-center">{item.phoneNumber}</td>
                  <td className="px-2 py-5 text-center">
                    {" "}
                    {item.items
                      .map((parcelItem) => parcelItem.quantity)
                      .reduce((total, quantity) => (total += quantity))}{" "}
                  </td>
                  <td className="px-2 py-5 text-right">
                    {item.sellPrice + item.deliveryCharge} TK
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            skip={skip}
            take={take}
            page={page}
            pageCount={pageCount}
            setSkip={setSkip}
            setPage={setPage}
          />
        </div>
      </section>
    </Layout>
  );
};

export default orderHistoryScreen;
