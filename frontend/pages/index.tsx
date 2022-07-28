/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@apollo/client";
import FaciCard from "../components/FaciCard";
import NavBar from "../components/NavBar";
import ProductItem from "../components/ProductItem";

import {
  QUERY_PRODUCT_PANJABI,
  QUERY_PRODUCT_WOMENS_FASHION,
} from "../resolvers/product/query";

export default function Home({ products }: any) {
  const {
    data: womenFashion,
    loading,
    error,
  } = useQuery(QUERY_PRODUCT_WOMENS_FASHION);
  const { data: panjabi } = useQuery(QUERY_PRODUCT_PANJABI);
  //const { data: panjabi, loading, error } = useQuery(QUERY_PRODUCT_PANJABI);

  return (
    <section>
      <NavBar />
      <div className="pb-10">
        <img
          src="/img/home-banner.jpg"
          alt="home baner "
          className="w-full h-auto"
        />
      </div>
      <div id="campaign"></div>
      <div id="womensFashion" className="py-10 ">
        <div className="container m-auto">
          <div className="mb-10 text-center ">
            <h1 className="text-2xl font-bold uppercase">Women's Fashion</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
            {womenFashion?.products.map((product, index) => {
              return <ProductItem product={product} key={index} />;
            })}
          </div>
        </div>
      </div>
      <div id="panjabi" className="py-20 bg-gray-200 ">
        <div className="container m-auto">
          <div className="mb-10 text-center ">
            <h1 className="text-2xl font-bold uppercase">Panjabi</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
            {panjabi?.products.map((product, index) => {
              return <ProductItem product={product} key={index} />;
            })}
          </div>
          <div className="mt-10 text-center">
            {" "}
            <button className="primary-button">Load More</button>
          </div>
        </div>
      </div>
      <div id="tShirt" className="py-20">
        <div className="container m-auto">
          <div className="mb-10 text-center ">
            <h1 className="text-2xl font-bold uppercase">T-Shirt</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
            {panjabi?.products.map((product, index) => {
              return <ProductItem product={product} key={index} />;
            })}
          </div>
          <div className="mt-10 text-center">
            {" "}
            <button className="primary-button">Load More</button>
          </div>
        </div>
      </div>
      <div id="facilities" className="py-20 bg-amber-400 ">
        <div className="container m-auto">
          <div className="flex flex-wrap justify-around space-x-2 space-y-2">
            {" "}
            <FaciCard
              icon="shipping"
              heading="Shipping Area"
              subHeading="All Over Bangladesh"
            />
            <FaciCard
              icon="time"
              heading="Delivery Time"
              subHeading="Within 2 days in Dhaka city"
            />
            <FaciCard
              icon="payment"
              heading="Payment System"
              subHeading="No Advanced Needed"
            />
          </div>
        </div>
      </div>
      <div id="faq" className="py-20">
        <div className="container m-auto">
          <div className="pb-10 text-center">
            <h1 className="text-2xl font-bold">FREQUENTLY ASKED QUESTIONS</h1>
            <p className="pt-3 font-light">
              Got a question? We've got answers. If you have other question, see
              our support page
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 mt-10">
            <div className="flex flex-col space-y-2">
              <h1 className="font-bold text-amber-500">
                Where is your location, please?
              </h1>
              <p className="font-light">
                Jamuna Future Park, Level 2, Zone C, South Court, Shop 2C-034
                (Wednesday Closed)
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="font-bold text-amber-500">
                What is your online order process?
              </h1>
              <p className="font-light">
                We don't take any advance payment for our online order through
                Bkash or Nagad or Rocket or Bank account or any other means. We
                do full cash on delivery all over Bangladesh.
              </p>
              <p className="font-light">
                Outside Dhaka we do full cash on delivery in full condition
                through SA Paribahan and Sundarban Courier Service within 3/4
                days . Delivery Charge is 100-200 tk depending on parcels size.
                Inside Dhaka delivery charge 100 tk.
              </p>
              <p className="font-light">
                To place ur order pls creat an account on our website and click
                the following link
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="font-bold text-amber-500">
                How much is your delivery charge ?
              </h1>
              <p className="font-light">
                Outside Dhaka Delivery Charge is 100-200 tk depending on parcels
                size.
              </p>
              <p className="font-light">
                Inside Dhaka delivery charge 100 tk..
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex items-center justify-center h-10 bg-white border-t-2 shadow-inner">
        <p>Copyright &copy; 2022 Shajerbati</p>
      </footer>
    </section>
  );
}
