import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Layout from "../../../components/Layout";
import { useDate } from "../../../lib/hooks/useDate";
import { useForm } from "../../../lib/hooks/useForm";
import useUser from "../../../lib/hooks/useUser";
import { UPDATE_WITHDRAW_MUATION } from "../../../resolvers/withdraw/mutation";
import { USER_WITHDRAW_REQ_SIGNLE } from "../../../resolvers/withdraw/query";

const WithdrawDetails = () => {
  const user = useUser();
  const router = useRouter();

  const { inputs, handleChange } = useForm({
    transactionId: "",
  });

  const { data, loading } = useQuery(USER_WITHDRAW_REQ_SIGNLE, {
    variables: { id: router.query.id },
  });

  const [withdrawPaymentDone] = useMutation(UPDATE_WITHDRAW_MUATION);

  console.log(data);

  const withDraw = data?.withdraw;

  const date = useDate(withDraw?.time);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated = await withdrawPaymentDone({
      variables: { transationID: inputs.transactionId, id: withDraw?.id },
      refetchQueries: [{ query: USER_WITHDRAW_REQ_SIGNLE }],
    });

    if (updated) {
      toast.success("Payment sent Successfully");
    }
  };

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
              <p className="font-bold">{withDraw?.amount} TK</p>
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
                <p className="font-bold">{withDraw?.transationID}</p>
              </div>
            )}
            <div className="flex flex-wrap justify-between px-5 py-2 ">
              <p>Withdraw Requested Date</p>
              <p className="font-bold">{date}</p>
            </div>
          </div>
          {user?.userType === "admin" && (
            <div className="flex flex-col w-full px-20 py-10 space-y-2 bg-gray-200 rounded-md">
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    className="inline-block mb-2 mr-4 font-bold text-gray-700"
                    htmlFor="transactionId"
                  >
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Enter Your Amount"
                    value={inputs.transactionId}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-6 text-center">
                  <button
                    className="px-6 py-3 rounded-md bg-amber-400"
                    type="submit"
                  >
                    Sent
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </section>
    </Layout>
  );
};

export default WithdrawDetails;
