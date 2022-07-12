import React from "react";
import Layout from "../components/Layout";

const signup = () => {
  return (
    <Layout title="signup">
      <div className=" flex items-center">
        <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
          <form className="py-12 p-10 bg-white rounded-xl">
            <h1 className="text-lg text-center font-bold pb-5">Sign Up Now</h1>
            <div className="mb-6">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                className="border bg-gray-100 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Name"
              />
            </div>
            <div className="mb-6">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="name"
              >
                Email
              </label>
              <input
                type="text"
                className="border bg-gray-100 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Email"
              />
            </div>
            <div className="">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="name"
              >
                Password
              </label>
              <input
                type="password"
                className="border bg-gray-100 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Password"
              />
            </div>

            <button className="primary-button w-full mt-8 transition duration-300">
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default signup;
