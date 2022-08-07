import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { useForm } from "../../lib/hooks/useForm";
import useUser from "../../lib/hooks/useUser";
import {
  CHANGE_PARCEL_STATUS_MUTATION,
  DELETE_PARCEL_MUTATION,
} from "../../resolvers/parcel/mutation";
import { SINGLE_PARCEL_QUERY } from "../../resolvers/parcel/query";
import { ME } from "../../resolvers/user/query";

const singleParcelViewScreen = () => {
  const user = useUser();

  const router = useRouter();
  const {
    query: { parcelId },
  } = router;

  const { data, loading, error } = useQuery(SINGLE_PARCEL_QUERY, {
    variables: { id: parcelId },
  });

  const { handleChange, inputs } = useForm({
    parcelStatus: data?.parcel.status || "",
  });

  const total = data?.parcel.items
    .map((item: any) => item.price * item.quantity)
    .reduce((sum, item) => (sum += item));

  const [changeParcelMutation] = useMutation(CHANGE_PARCEL_STATUS_MUTATION);

  const changeParcelStatus = async () => {
    await changeParcelMutation({
      variables: {
        parcelId,
        status: inputs.parcelStatus,
      },
      refetchQueries: "active",
    });
  };

  const [deleteParcel] = useMutation(DELETE_PARCEL_MUTATION);

  const cancelOrderHandler = async () => {
    const deleted = await deleteParcel({
      variables: { id: data?.parcel.id },
      refetchQueries: [{ query: ME }],
    });
    router.push("/");
    toast.success("The parcel has deleted successfully");
  };

  return (
    <Layout title="Parcel View">
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
              {data?.parcel.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td>
                    {" "}
                    <a className="flex items-center">
                      {" "}
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
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
              <div>{data?.parcel.sellPrice} TK</div>
            </div>
            <div className="flex justify-between mb-2 ">
              <div>Reseller Price Total</div>
              <div> {total} TK</div>
            </div>
            <div className="flex justify-between mb-2 border-b border-slate-700">
              <div>Delivery Charge</div>
              <div> {data?.parcel.deliveryCharge} TK</div>
            </div>
            <div className="flex justify-between mb-2 ">
              <div> Reseller Profit ( if delivered )</div>
              <div
                className={
                  data?.parcel.sellPrice -
                    (total + data?.parcel.deliveryCharge) <=
                  0
                    ? "text-red-500"
                    : ""
                }
              >
                {data?.parcel.sellPrice - (total + data?.parcel.deliveryCharge)}{" "}
                TK
              </div>
            </div>
          </div>
          {user?.userType !== "admin" && (
            <div>
              {data?.parcel.status === ("pending" || "accepted") ? (
                <div className="text-center">
                  <button
                    className="primary-button"
                    type="button"
                    onClick={cancelOrderHandler}
                  >
                    Cancel Order
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="primary-button">
                    You can not delete the parcel now. Becouse, the parcel
                    already out for delivery.{" "}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="col-span-2">
          <div>
            <div className="p-5 card">
              <div className="mb-2 font-bold text-center">
                <div>Shipping Method</div>
              </div>
              <div className="px-4 py-2 mb-2 text-center rounded shadow outline-none bg-amber-300">
                <div>{data?.parcel.shippingMethod}</div>
              </div>
            </div>
            <div className="p-5 card">
              <div className="mb-2 font-bold text-center">
                <div> Parcel Status </div>
              </div>

              {user?.userType === "admin" ? (
                <div className="flex justify-center">
                  <div className="mb-3 xl:w-96">
                    <select
                      className="form-select appearance-none
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                      name="parcelStatus"
                      value={inputs?.parcelStatus}
                      onChange={handleChange}
                    >
                      <option value="pending">Parcel Pending</option>
                      <option value="accepted">Parcel Accepted</option>
                      <option value="outForDelivery">Out For Delivery</option>
                      <option value="delivered">Parcel Delivered</option>
                      <option value="returning">Parcel Returning</option>
                      <option value="returned">Parcel Returned</option>
                      <option value="paymentPending">Peyment Pending</option>
                      <option value="paymentDelivered">
                        Payment Delivered
                      </option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-2 mb-2 text-center rounded shadow outline-none bg-amber-300">
                  <div>{data?.parcel.status}</div>
                </div>
              )}
              {data?.parcel.status !== inputs?.parcelStatus && (
                <div className="text-center">
                  <button
                    className="primary-button"
                    onClick={changeParcelStatus}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="w-full p-5 card">
              <div className="mb-2 font-bold text-center">
                <div>Customers Information</div>
              </div>
              <div className="w-full px-4 py-2 mb-2 bg-gray-100 rounded shadow outline-none ">
                <h1 className="font-bold">Name:</h1>
                <div>{data?.parcel.name}</div>
              </div>
              <div className="w-full px-4 py-2 mb-2 bg-gray-100 rounded shadow outline-none ">
                <h1 className="font-bold">Shipping Address:</h1>
                <p className="w-full">{data?.parcel.address}</p>
              </div>
              <div className="w-full px-4 py-2 mb-2 bg-gray-100 rounded shadow outline-none ">
                <h1 className="font-bold">Phone Number:</h1>
                <div>{data?.parcel.phoneNumber}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default singleParcelViewScreen;
