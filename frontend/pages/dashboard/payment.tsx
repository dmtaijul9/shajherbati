import { useMutation } from "@apollo/client";
import React from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { useForm } from "../../lib/hooks/useForm";
import useUser from "../../lib/hooks/useUser";
import { ME } from "../../resolvers/user/query";
import { WITHDRAW_REQUEST_MUTATION } from "../../resolvers/withdraw/mutation";

const payment = () => {
  const user = useUser();
  const { clearForm, handleChange, inputs, resetForm } = useForm({
    amount: "",
    bkashNumber: user?.bkash || "",
  });

  const [createWithdrawReq] = useMutation(WITHDRAW_REQUEST_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(inputs.amount) > user?.paymentDue) {
      toast.error("You Have not sufficiant ballance to withdraw");
      return;
    }

    await createWithdrawReq({
      variables: inputs,
      refetchQueries: [{ query: ME }],
    });
  };
  return (
    <Layout title="Payment history">
      <section className="flex flex-col max-w-2xl py-4 m-auto space-y-5">
        <div className="flex flex-col items-center justify-center py-10 space-y-2 rounded-md bg-amber-400">
          <div>
            <p>Available ballance to withdraw</p>
          </div>
          <div>
            <h1 className="text-4xl font-bold"> $ {user?.paymentDue}</h1>
          </div>
          <div>
            <p>Selling on Alekscreation Till Date</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-2 py-10 space-y-2 bg-gray-200 rounded-md">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="Amount"
              >
                Amount
              </label>
              <input
                type="number"
                name="amount"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter Your Amount"
                value={inputs.amount}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="bkash"
              >
                Bkash Number
              </label>
              <input
                type="text"
                name="bkashNumber"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter Your Bkash Number"
                value={inputs.bkashNumber}
                onChange={handleChange}
              />
            </div>

            <div className="mt-6 text-center">
              <button
                className="px-6 py-3 rounded-md bg-amber-400"
                type="submit"
              >
                Withdraw Now
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default payment;
