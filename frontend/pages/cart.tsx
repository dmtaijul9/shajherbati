/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/store";
import { XCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

const cart = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeCardItemHandler = (item) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: item });
  };
  const handleChangeQty = (item, qty) => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity: Number(qty) },
    });
  };
  console.log(cartItems);

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems?.length === 0 ? (
        <div>
          Cart is emplty. <Link href="/">Go Shopping </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-right">Quantity</th>
                  <th className="px-5 text-right">Price</th>
                  <th className="px-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td>
                      {" "}
                      <Link href={`/product/${item.id}`}>
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
                      </Link>{" "}
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) => {
                          handleChangeQty(item, e.target.value);
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {" "}
                            {x + 1}{" "}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right"> {item.price} </td>
                    <td className="p-5 text-center">
                      <button>
                        <XCircleIcon
                          onClick={() => removeCardItemHandler(item)}
                          className="w-5 h-5"
                        ></XCircleIcon>{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="p-5 card">
              <ul>
                <li>
                  <div className="pb-3 text-xl">
                    Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)}) :
                    $ {cartItems.reduce((a, b) => a + b.quantity * b.price, 0)}
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => router.push("shipping")}
                    className="w-full primary-button"
                  >
                    Create Percel
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default cart;
