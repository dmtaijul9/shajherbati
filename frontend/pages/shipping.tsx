/* eslint-disable react-hooks/rules-of-hooks */
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { useForm } from "../lib/hooks/useForm";
import { Store } from "../utils/store";

const shipping = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    fullName: "",
    address: "",
    phoneNumber: "",
  });
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const submitHandler = () => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, phoneNumber },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          phoneNumber,
        },
      })
    );
    router.push("/payment");
  };
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form className="max-w-screen-md mx-auto" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="w-full"
            id="fullName"
            autoFocus
            name="fullName"
            value={inputs.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <textarea
            className="w-full"
            id="address"
            autoFocus
            name="address"
            value={inputs.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            className="w-full"
            id="phoneNumber"
            autoFocus
            name="phoneNumber"
            value={inputs.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between mb-4">
          <button type="submit" className="primary-button">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
};
shipping.auth = true;

export default shipping;
