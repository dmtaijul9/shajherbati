import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/store";

const parcel = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress } = cart;

  const total = cartItems
    .map((item: any) => item.price * item.quantity)
    .reduce((sum, item) => (sum += item));

  const sellPrice =
    parseInt(shippingAddress?.sellPrice) +
    parseInt(shippingAddress?.deliveryCharge);

  console.log(cart);

  return (
    <Layout title="Create Parcel">
      <CheckoutWizard activeStep={3} />
      <section className="grid grid-cols-1 gap-5 md:grid-cols-5">
        <div className="col-span-3">
          {/*  <h1 className="font-bold text-center uppercase">Item List</h1> */}
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">Item</th>
                <th className="px-5 text-center">Quantity</th>
                <th className="px-5 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td>
                    {" "}
                    <a className="flex items-center">
                      {" "}
                      <Image
                        src={item.productImg[0].image.url}
                        alt={item.productImg[0].name}
                        width={50}
                        height={50}
                      />{" "}
                      &nbsp;
                      {item.name}
                    </a>
                  </td>
                  <td className="p-5 text-center">{item.quantity}</td>
                  <td className="p-5 text-right">
                    {" "}
                    {item.price * item.quantity}{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-5 mt-10 card">
            <div className="flex justify-between mb-2">
              <div>Sell Price Total</div>
              <div>{sellPrice} TK</div>
            </div>
            <div className="flex justify-between mb-2 border-b border-slate-700">
              <div>Reseller Price Total</div>
              <div> {total} TK</div>
            </div>
            <div className="flex justify-between mb-2">
              <div> Reseller Profit ( if delivered )</div>
              <div className={sellPrice - total <= 0 ? "text-red-500" : ""}>
                {" "}
                {sellPrice - total} TK
              </div>
            </div>
            <button className="w-full primary-button">Create Parcel</button>
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <div className="p-5 card">
              <div className="mb-2 font-bold text-center">
                <div>Shipping Method</div>
              </div>
              <div className="px-4 py-2 mb-2 text-center rounded shadow outline-none bg-amber-300">
                <div>{cart.paymentMethod}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full p-5 card">
              <div className="mb-2 font-bold text-center">
                <div>Customers Information</div>
              </div>
              <div className="w-full px-4 py-2 mb-2 bg-gray-100 rounded shadow outline-none ">
                <h1 className="font-bold">Name:</h1>
                <div>{shippingAddress.fullName}</div>
              </div>
              <div className="w-full px-4 py-2 mb-2 bg-gray-100 rounded shadow outline-none ">
                <h1 className="font-bold">Shipping Address:</h1>
                <p className="w-full">{shippingAddress.address}</p>
              </div>
              <div className="w-full px-4 py-2 mb-2 bg-gray-100 rounded shadow outline-none ">
                <h1 className="font-bold">Phone Number:</h1>
                <div>{shippingAddress.phoneNumber}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default parcel;
