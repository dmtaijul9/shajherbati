import React from "react";
import ProductItem from "./ProductItem";

const ShowCase = ({
  products,
  category,
  color,
  hrefLink,
}: {
  products: any;
  category: string;
  color: boolean;
  hrefLink: string;
}) => {
  return (
    <div className={`px-2 py-20 ${color ? "bg-gray-200 " : ""}`}>
      <div className="container m-auto">
        <div className="mb-10 text-center ">
          <h1 className="text-2xl font-bold uppercase"> {category} </h1>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
          {products?.map((product, index) => {
            return <ProductItem product={product} key={index} />;
          })}
        </div>
        <div className="mt-10 text-center">
          {" "}
          <a href={`/${hrefLink}`} className="primary-button">
            Load More
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
