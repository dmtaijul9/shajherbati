/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductItem = ({ product }: any) => {
  return (
    <div className="card">
      <Link href={`/product/${product.id}`}>
        <a>
          <Image
            src={product?.productImg[0].image.url}
            alt={product?.name}
            width="400"
            height="350"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.id}`}>
          <a>
            <h2>{product?.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product?.brand}</p>
        <p>${product?.price}</p>
        <button className="primary-button" type="button">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
