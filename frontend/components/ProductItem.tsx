/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { Store } from "../utils/store";

const ProductItem = ({ product }: any) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (item: any) => item.id === product.id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      toast.error("Sorry. Product is out of stock!");

      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("Product Added to cart.");

    router.push("/cart");
  };
  if (!product) {
    return <div>Product not found!</div>;
  }
  return (
    <div className="max-w-[300px] card m-auto bg-white">
      <Link href={`/product/${product.id}`}>
        <a>
          <img
            className="w-full"
            src={product?.productImg[0].image.url}
            alt={product?.name}
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center px-5 pt-5">
        <Link href={`/product/${product.id}`}>
          <a>
            <h2>{product?.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product?.brand}</p>
        <p>{product?.price} TK</p>
      </div>
      <button
        className="w-full mt-3 primary-button"
        type="button"
        onClick={addToCartHandler}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductItem;
