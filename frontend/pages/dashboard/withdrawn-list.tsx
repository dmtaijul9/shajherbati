/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@apollo/client";
import { SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import { getWithdrawHistory } from "../../lib/getDataFromApi";
import { useForm } from "../../lib/hooks/useForm";
import useUser from "../../lib/hooks/useUser";

const withdrawn = () => {
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);
  const [search, setSearch] = useState("");

  const user = useUser();
  const router = useRouter();

  const { inputs, handleChange } = useForm({
    search: "",
  });

  const { data, loading, error } = getWithdrawHistory(take, skip, search);

  const pageCount = Math.ceil(data?.withdrawsCount / take);
  console.log(data);

  const handleSubmit = () => {
    setSearch(inputs.search);
  };

  if (loading) {
    return (
      <Layout title="Withdraw History">
        <section>
          <div>Loading</div>
        </section>
      </Layout>
    );
  }

  if (data?.withdrawsCount === 0) {
    return (
      <Layout title="Withdraw History">
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
            <div>You Have No Withdraw History</div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title="Withdraw History">
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
                <th className="px-5 text-left">Name</th>
                <th className="px-2 py-5 text-center sm:px-5">Bkash Number</th>
                <th className="px-2 py-5 text-center sm:px-5">Status</th>
                <th className="px-2 py-5 text-right sm:px-5">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data?.withdraws.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="border-b"
                  onClick={() => {
                    router.push(`/dashboard/withdraw/${item.id}`);
                  }}
                >
                  <td className="px-5 text-left">{item.user.name}</td>
                  <td className="px-2 py-5 text-center sm:px-5">
                    {item.bkashNumber}
                  </td>
                  <td className="px-2 py-5 text-center sm:px-5">
                    {item.status}
                  </td>
                  <td className="px-2 py-5 text-right sm:px-5">
                    {item.amount}
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

export default withdrawn;
