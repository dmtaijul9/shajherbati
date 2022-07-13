/* eslint-disable react-hooks/rules-of-hooks */
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { useForm } from "../lib/hooks/useForm";
import { Store } from "../utils/store";

const shipping = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    fullName: shippingAddress?.fullName ? shippingAddress?.fullName : "",
    address: shippingAddress?.address ? shippingAddress?.address : "",
    phoneNumber: shippingAddress?.phoneNumber
      ? shippingAddress?.phoneNumber
      : "",
    sellPrice: shippingAddress?.sellPrice ? shippingAddress?.sellPrice : "",
    deliveryCharge: shippingAddress?.deliveryCharge
      ? shippingAddress?.deliveryCharge
      : "",
  });

  console.log(state);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { ...inputs },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          ...inputs,
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
        <div className="mb-4">
          <label htmlFor="sellPrice">Sell Price</label>
          <input
            className="w-full"
            id="sellPrice"
            autoFocus
            name="sellPrice"
            value={inputs.sellPrice}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="deliveryCharge">Delivery Charge</label>
          <input
            className="w-full"
            id="deliveryCharge"
            autoFocus
            name="deliveryCharge"
            value={inputs.deliveryCharge}
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
