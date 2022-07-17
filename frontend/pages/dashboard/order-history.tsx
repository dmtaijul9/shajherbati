import { useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout";
import useUser from "../../lib/hooks/useUser";
import { PARCEL_LIST_QUERY_FOR_USER } from "../../resolvers/parcel/query";

const orderHistoryScreen = () => {
  const user = useUser();
  console.log(user);

  const { data, loading, error } = useQuery(PARCEL_LIST_QUERY_FOR_USER, {
    variables: { userId: user?.id },
  });

  return (
    <Layout title="order history">
      <section>
        <div>Order History</div>
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
