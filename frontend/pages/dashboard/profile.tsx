/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from "@apollo/client";
import React from "react";
import Layout from "../../components/Layout";
import { useForm } from "../../lib/hooks/useForm";
import useUser from "../../lib/hooks/useUser";
import { UPDATE_USER } from "../../resolvers/user/mutation";
import { ME } from "../../resolvers/user/query";

const profile = () => {
  const user = useUser();
  const { clearForm, handleChange, inputs, resetForm } = useForm({
    name: "",
    email: "",
    bkashNumber: "",
    fbPageName: "",
    password: "",
    address: "",
  });
  const [updateUser] = useMutation(UPDATE_USER);

  const submitHandler = async (e) => {
    e.preventDefault();

    const variables = {};

    if (inputs.name !== "") {
      variables.name = inputs.name;
    }
    if (inputs.email !== "") {
      variables.email = inputs.email;
    }
    if (inputs.bkashNumber !== "") {
      variables.bkash = inputs.bkashNumber;
    }
    if (inputs.fbPageName !== "") {
      variables.fbPageName = inputs.fbPageName;
    }
    if (inputs.address !== "") {
      variables.address = inputs.address;
    }
    if (inputs.password !== "") {
      variables.password = inputs.password;
    }

    variables.id = user?.id;

    console.log(variables);
    const updatedUser = await updateUser({
      variables,
      refetchQueries: [{ query: ME }],
    });
  };
  return (
    <Layout title="signup">
      <div className="flex items-center ">
        <div className="container max-w-md mx-auto transition duration-300 shadow-md hover:shadow-lg">
          <form
            className="p-10 py-12 bg-white rounded-xl"
            onSubmit={submitHandler}
          >
            <h1 className="pb-5 text-lg font-bold text-center">
              Manage Your Profile{" "}
            </h1>
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
                Your Address
              </label>
              <input
                type="text"
                name="address"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Your Address"
                value={inputs.address}
                onChange={handleChange}
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
                name="bkashNumber"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Bkash Number"
                value={inputs.bkashNumber}
                onChange={handleChange}
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
                name="fbPageName"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="FB Page Name"
                value={inputs.fbPageName}
                onChange={handleChange}
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
                name="email"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Email"
                value={inputs.email}
                onChange={handleChange}
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
                name="password"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Password"
                value={inputs.password}
                onChange={handleChange}
              />
            </div>

            <button
              className="w-full mt-8 transition duration-300 primary-button"
              type="submit"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default profile;
