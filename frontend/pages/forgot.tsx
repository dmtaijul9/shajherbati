import { useMutation } from "@apollo/client";
import React from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { useForm } from "../lib/hooks/useForm";
import { REQUEST_PASSWORD_RESET } from "../resolvers/user/mutation";

const forgot = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
  });

  const [requestPasswordReset] = useMutation(REQUEST_PASSWORD_RESET);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    await requestPasswordReset({
      variables: {
        email: inputs.email,
      },
    })
      .then(() => {
        resetForm();
        toast.success("Check your email for a reset link");
      })
      .catch((error) => {
        toast.error("Error requesting password reset");
      });
  };
  return (
    <Layout title="Forgot Password">
      <div className="flex items-center ">
        <div className="container max-w-md mx-auto transition duration-300 shadow-md hover:shadow-lg">
          <form
            className="p-10 py-12 bg-white rounded-xl"
            onSubmit={handleSubmit}
          >
            <h1 className="pb-5 text-lg font-bold text-center">
              Forgot Password
            </h1>

            <div className="mb-6">
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="name"
              >
                Email
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={inputs.email}
              />
            </div>

            <button
              className="w-full mt-3 transition duration-300 primary-button"
              type="submit"
            >
              Send instruction
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default forgot;
