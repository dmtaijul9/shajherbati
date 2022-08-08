/* eslint-disable react-hooks/rules-of-hooks */
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { useForm } from "../lib/hooks/useForm";
import useUser from "../lib/hooks/useUser";
import { Store } from "../utils/store";

const shipping = () => {
  const user = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    fullName: "",
    address: "",
    phoneNumber: "",
    sellPrice: "",
    deliveryCharge: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const { fullName, address, phoneNumber, sellPrice, deliveryCharge } =
      inputs;

    console.log(deliveryCharge);

    if (deliveryCharge === "70" || deliveryCharge === "150") {
      const variables = {
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        sellPrice: sellPrice,
        deliveryCharge: parseInt(deliveryCharge),
      };

      console.log(variables);

      dispatch({
        type: "SAVE_SHIPPING_ADDRESS",
        payload: variables,
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
      return;
    }

    toast.error("Please Input All field");
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
          <select
            name="deliveryCharge"
            id="deliveryCharge"
            className="w-full"
            value={inputs.deliveryCharge}
            onChange={handleChange}
          >
            <option value="">Select One</option>
            <option value="70">Dhaka</option>
            <option value="150">Outside Dhaka</option>
          </select>
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
