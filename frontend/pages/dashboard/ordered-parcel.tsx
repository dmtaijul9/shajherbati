/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@apollo/client";
import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import { getParcelListAdmin } from "../../lib/getDataFromApi";
import { useForm } from "../../lib/hooks/useForm";
import useUser from "../../lib/hooks/useUser";
import { PENDING_PARCEL_COUNT } from "../../resolvers/parcel/query";

const orderedParcelScreen = () => {
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);
  const [search, setSearch] = useState("");

  const user = useUser();
  const router = useRouter();

  const { inputs, handleChange } = useForm({
    search: "",
  });

  const { data, loading, error } = getParcelListAdmin(take, skip, search);

  const { data: PendingCount } = useQuery(PENDING_PARCEL_COUNT);

  const pageCount = Math.ceil(data?.parcelsCount / take);
  console.log(data);

  const handleSubmit = () => {
    setSearch(inputs.search);
  };

  if (user?.userType !== "admin") {
    return (
      <Layout title="admin page">
        <div> Sorry Sir! You are not Admin of the site </div>
      </Layout>
    );
  }

  return (
    <Layout title="ordered parcel list">
      <section>
        <div className="flex flex-wrap justify-around">
          <div>
            {" "}
            <div className="p-5 w-80 card">
              <div className="flex justify-between mb-2 font-bold text-center">
                <div>New Parcel Requested</div>
                <div className="px-4 text-white bg-red-600 rounded-md">
                  {PendingCount?.parcelsCount}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between pb-4 mb-5 text-2xl font-bold border-b-2 border-amber-400">
          <div>
            {" "}
            <h1>Ordered Parcel</h1>
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
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">Name</th>
                <th className="px-5 text-center">Phone Number</th>
                <th className="px-5 text-center">Status</th>

                <th className="px-5 text-center">Total Quantity</th>
                <th className="px-5 text-right">Total Price</th>
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
                  <td className="p-5 text-left">{item.name}</td>
                  <td className="p-5 text-center">{item.phoneNumber}</td>
                  <td className="p-5 text-center">{item.status}</td>
                  <td className="p-5 text-center">
                    {" "}
                    {item.items
                      .map((parcelItem) => parcelItem.quantity)
                      .reduce((total, quantity) => (total += quantity))}{" "}
                  </td>
                  <td className="p-5 text-right">
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

export default orderedParcelScreen;
function setSearch(search: any) {
  throw new Error("Function not implemented.");
}
function ugetParcelListAdmin(
  take: number,
  skip: number,
  search: string
): { data: any; loading: any; error: any } {
  throw new Error("Function not implemented.");
}
