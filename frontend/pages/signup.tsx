import React from "react";
import Layout from "../components/Layout";
import { useForm } from "../lib/hooks/useForm";

const signup = () => {
  const { clearForm, handleChange, inputs, resetForm } = useForm({
    name: "",
    email: "",
    bkashNumber: "",
    fbPageName: "",
    password: "",
    address: "",
  });
  return (
    <Layout title="signup">
      <div className="flex items-center ">
        <div className="container max-w-md mx-auto transition duration-300 shadow-md hover:shadow-lg">
          <form className="p-10 py-12 bg-white rounded-xl">
            <h1 className="pb-5 text-lg font-bold text-center">Sign Up Now</h1>
            <div className="mb-6">
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Name"
                name="name"
                value={inputs.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="address"
              >
                Bkash Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="bkashNumber"
              />
            </div>

            <div className="mb-6">
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="name"
              >
                Bkash Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="bkashNumber"
              />
            </div>
            <div className="mb-6">
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="name"
              >
                FB Page Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="fbPageName"
              />
            </div>
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
              />
            </div>

            <button className="w-full mt-8 transition duration-300 primary-button">
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default signup;
