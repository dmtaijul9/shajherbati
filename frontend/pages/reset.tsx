import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { useForm } from "../lib/hooks/useForm";
import { RESET_PASSWORD } from "../resolvers/user/mutation";

const reset = () => {
  const router = useRouter();
  const { email, token } = router.query;
  const { inputs, handleChange, resetForm } = useForm({
    password: "",
    confirm_password: "",
  });

  const [resetPassword] = useMutation(RESET_PASSWORD);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputs.password !== inputs.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    await resetPassword({
      variables: {
        email,
        token,
        password: inputs.password,
      },
    })
      .then(() => {
        resetForm();
        toast.success("Successfully reset password");
        router.push("/login");
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
              Reset Password
            </h1>
            <p className="pb-2 text-center">
              Please enter your new password and confirm it
            </p>

            <div className="">
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="name"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Password"
                value={inputs.password}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="name"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Confirm Password "
                value={inputs.confirm_password}
                onChange={handleChange}
              />
            </div>

            <button
              className="w-full mt-3 transition duration-300 primary-button"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default reset;
