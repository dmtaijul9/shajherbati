import { useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import { PARCEL_LIST_QUERY_FOR_ADMIN } from "../../resolvers/parcel/query";

const orderedParcelScreen = () => {
  const { data, loading, error } = useQuery(PARCEL_LIST_QUERY_FOR_ADMIN);

  const pendingParcel = data?.parcels.filter(
    (item) => item.status === "pending"
  );

  const parcelOnProcessing = data?.parcels.filter(
    (item) => item.status !== ("pending" || "paymentDelivered")
  );
  console.log(parcelOnProcessing);

  return (
    <Layout title="ordered parcel list">
      <section>
        <div className="flex flex-wrap justify-around">
          <div>
            {" "}
            <div className="p-5 w-80 card">
              <div className="flex justify-between mb-2 font-bold text-center">
                <div>New Parcel Requested</div>
                <div className="px-4 text-white bg-red-600 rounded-md">
                  {pendingParcel?.length}
                </div>
              </div>
              <div className="px-4 py-2 mb-2 text-center rounded shadow outline-none bg-amber-300">
                <div>See All List</div>
              </div>
            </div>
          </div>
          <div>
            <div className="p-5 card w-80">
              <div className="flex justify-between mb-2 font-bold text-center">
                <div>Parcel On Proccessing</div>
                <div className="px-4 text-white bg-red-600 rounded-md">
                  {parcelOnProcessing?.length}
                </div>
              </div>
              <div className="px-4 py-2 mb-2 text-center rounded shadow outline-none bg-amber-300">
                <div>See All List</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">Name</th>
                <th className="px-5 text-center">Phone Number</th>
                <th className="px-5 text-center">Status</th>

                <th className="px-5 text-center">Total Quantity</th>
                <th className="px-5 text-center">Total Price</th>
                <th className="px-5 text-right"></th>
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
                  <td className="p-5 text-center">
                    {item.sellPrice + item.deliveryCharge} TK
                  </td>
                  <td className="p-5 text-right">
                    <Link href={`/parcelview/${item.id}`}>
                      <a className="primary-button">View Parcel</a>
                    </Link>
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

export default orderedParcelScreen;
