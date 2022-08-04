import { useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout";
import useUser from "../../lib/hooks/useUser";
import { PARCEL_LIST_QUERY_FOR_USER } from "../../resolvers/parcel/query";

const orderHistoryScreen = () => {
  const user = useUser();

  const { data, loading, error } = useQuery(PARCEL_LIST_QUERY_FOR_USER, {
    variables: { userId: user?.id },
  });

  if (loading) {
    return (
      <Layout title="order history">
        <div className="flex items-center justify-center">
          <div
            className="inline-block w-8 h-8 border-4 rounded-full spinner-border animate-spin"
            role="status"
          ></div>
        </div>
      </Layout>
    );
  } else if (data?.parcels.length === 0) {
    return <Layout title="order history">You Have no parcel to show</Layout>;
  }

  return (
    <Layout title="order history">
      <section>
        <div className="pb-4 mb-5 text-2xl font-bold text-center border-b-2 border-amber-400">
          <h1>Order History</h1>
        </div>
        <div>
          {" "}
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">Name</th>
                <th className="px-5 text-center">Phone Number</th>
                <th className="px-5 text-center">Status</th>

                <th className="px-5 text-center">Total Quantity</th>
                <th className="px-5 text-right">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {data?.parcels.map((item, index) => (
                <tr key={index} className="border-b">
                  <td>{item.name}</td>
                  <td className="p-5 text-center">{item.phoneNumber}</td>
                  <td className="p-5 text-center">{item.status}</td>
                  <td className="p-5 text-center">
                    {" "}
                    {item.items
                      .map((parcelItem) => parcelItem.quantity)
                      .reduce((total, quantity) => (total += quantity))}{" "}
                  </td>
                  <td className="p-5 text-right">
                    {item.sellPrice + item.deliveryCharge} TK
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export default orderHistoryScreen;
