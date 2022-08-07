/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import useUser from "../../lib/hooks/useUser";
import { USER_WITHDRAW_REQ } from "../../resolvers/withdraw/query";

const withdrawHistory = () => {
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);

  const user = useUser();
  const router = useRouter();
  const { data, loading, error } = useQuery(USER_WITHDRAW_REQ, {
    variables: { userId: user?.id, skip },
  });

  const pageCount = Math.ceil(data?.withdrawsCount / take);
  console.log(data);

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
          <div>You Have No Withdraw History</div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title="Withdraw History">
      <section>
        <div className="pb-4 mb-5 text-2xl font-bold text-center border-b-2 border-amber-400">
          <h1>Withdraw History</h1>
        </div>
        <div>
          {" "}
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                {/*      <th className="px-5 text-left">Name</th> */}
                <th className="px-2 py-5 text-left sm:px-5">Bkash Number</th>
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
                  {/*   <td>{item.user.name}</td> */}
                  <td className="px-2 py-5 text-left sm:px-5">
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

export default withdrawHistory;
