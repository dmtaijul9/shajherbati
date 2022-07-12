/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { useForm } from "../lib/hooks/useForm";
import useUser from "../lib/hooks/useUser";
import { SIGNIN_MUTATION } from "../resolvers/user/mutation";

const login = () => {
  const user = useUser();
  const router = useRouter();
  const { clearForm, handleChange, inputs, resetForm } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const [signin] = useMutation(SIGNIN_MUTATION);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await signin({ variables: inputs });

    if (result?.data.authenticateUserWithPassword.message) {
      toast.error(result.data.authenticateUserWithPassword.message);
      return;
    }
    toast.success("Login Success");
    router.push("redirect=/");
  };

  return (
    <Layout title="Login">
      <div className="flex items-center ">
        <div className="container max-w-md mx-auto transition duration-300 shadow-md hover:shadow-lg">
          <form
            className="p-10 py-12 bg-white rounded-xl"
            onSubmit={handleSubmit}
          >
            <h1 className="pb-5 text-lg font-bold text-center">Login Now</h1>

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
            <div className="">
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="name"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={inputs.password}
              />
            </div>
            <span className="inline-block mt-4 text-sm text-gray-700 transition duration-200 hover:text-indigo-600 hover:underline hover:cursor-pointer">
              forget password
            </span>
            <button
              className="w-full mt-6 transition duration-300 primary-button"
              type="submit"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default login;
