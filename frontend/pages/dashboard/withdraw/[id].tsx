import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { useDate } from "../../../lib/hooks/useDate";
import { USER_WITHDRAW_REQ_SIGNLE } from "../../../resolvers/withdraw/query";

const WithdrawDetails = () => {
  const router = useRouter();

  const { data, loading } = useQuery(USER_WITHDRAW_REQ_SIGNLE, {
    variables: { id: router.query.id },
  });

  const withDraw = data?.withdraw;

  const date = useDate(withDraw?.time);

  return (
    <Layout title="Withdraw Details">
      <section>
        <section className="flex flex-col max-w-2xl py-4 m-auto space-y-5">
          <div className="flex flex-col items-center justify-center py-10 space-y-2 rounded-md bg-amber-400">
            <div>
              <h1 className="text-xl font-bold">Withdraw Details</h1>
            </div>
          </div>
          <div className="flex flex-col w-full px-2 py-10 space-y-2 bg-gray-200 rounded-md">
            <div className="flex flex-wrap justify-between px-5 py-2 border-b border-gray-400">
              <p>Withdraw Amount</p>
              <p className="font-bold">{withDraw?.amount}</p>
            </div>
            <div className="flex flex-wrap justify-between px-5 py-2 border-b border-gray-400">
              <p>Bkash Number</p>
              <p className="font-bold">{withDraw?.bkashNumber}</p>
            </div>
            <div className="flex flex-wrap justify-between px-5 py-2 border-b border-gray-400">
              <p>Status</p>
              <p className="font-bold">{withDraw?.status}</p>
            </div>
            {withDraw?.status === "done" && (
              <div className="flex flex-wrap justify-between px-5 py-2 border-b border-gray-400">
                <p>Transaction ID</p>
                <p className="font-bold">{withDraw?.transactionID}</p>
              </div>
            )}
            <div className="flex flex-wrap justify-between px-5 py-2 ">
              <p>Withdraw Requested Date</p>
              <p className="font-bold">{date}</p>
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default WithdrawDetails;
