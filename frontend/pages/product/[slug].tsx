/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../components/Layout";
import { Store } from "../../utils/store";

export async function getServerSideProps(context: any) {
  const { slug } = context?.query;

  const {
    data: {
      data: { product },
    },
  } = await axios({
    method: "POST",
    url: "http://localhost:3000/api/graphql",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      query: `
        query {
          product (where: {id: "${slug}"}) {
            id
            name
            category
            price
            brand
            description
            countInStock
            productImg {
              image {
                url
              }
            }
          }
        }
      `,
    },
  });

  return {
    props: {
      product,
    },
  };
}

const productScreen = ({ product }: any) => {
  console.log(product);

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
    router.push("/cart");
  };
  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <Layout title={product?.name}>
      <div className="py-2">
        <Link href="/">Back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product?.productImg[0].image.url}
            alt={product?.productImg[0].name}
            width={640}
            height={640}
            layout="responsive"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg"> {product?.name} </h1>
            </li>
            <li>Category: {product?.category}</li>
            <li>Brand: {product?.brand}</li>
            <li>
              {product?.rating} of {product?.numReviews} reviews
            </li>
            <li>Description: {product?.description}</li>
          </ul>
        </div>
        <div>
          <div className="p-5 card">
            <div className="flex justify-between mb-2">
              <div>Price</div>
              <div>${product?.price} </div>
            </div>
            <div className="flex justify-between mb-2">
              <div>Status</div>
              <div>
                {product?.countInStock > 0 ? "In Stock" : "Unavailable"}{" "}
              </div>
            </div>
            <button
              className="w-full primary-button"
              onClick={addToCartHandler}
            >
              Add to percel
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default productScreen;
