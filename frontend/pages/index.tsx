/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@apollo/client";
import FaciCard from "../components/FaciCard";
import NavBar from "../components/NavBar";
import ProductItem from "../components/ProductItem";
import ShowCase from "../components/ShowCase";

import {
  QUERY_PRODUCT_PANJABI,
  QUERY_PRODUCT_TSHIRT,
  QUERY_PRODUCT_WOMENS_FASHION,
} from "../resolvers/product/query";

export default function Home({ products }: any) {
  const {
    data: womenFashion,
    loading,
    error,
  } = useQuery(QUERY_PRODUCT_WOMENS_FASHION);
  const { data: panjabi } = useQuery(QUERY_PRODUCT_PANJABI);
  const { data: tShirt } = useQuery(QUERY_PRODUCT_TSHIRT);

  return (
    <section>
      <NavBar />
      <div className="pb-10">
        <img
          src="/img/hero.jpg"
          alt="home baner "
          className="w-full max-h-[600px]"
        />
      </div>

      {womenFashion?.products.length !== 0 && (
        <ShowCase
          products={womenFashion?.products}
          category="Womens Fashion"
          color={false}
          hrefLink="womens-fashion"
        />
      )}
      {panjabi?.products.length !== 0 && (
        <ShowCase
          products={panjabi?.products}
          category="Panjabi"
          color={true}
          hrefLink="panjabi"
        />
      )}
      {tShirt?.products.length !== 0 && (
        <ShowCase
          products={tShirt?.products}
          category="T-Shirt"
          color={false}
          hrefLink="t-shirt"
        />
      )}

      <div id="facilities" className="px-5 py-20 bg-amber-400">
        <div className="container m-auto">
          <div className="flex flex-wrap items-center justify-around space-x-2 space-y-2">
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
          <div className="px-5 pb-10 text-center">
            <h1 className="text-2xl font-bold">FREQUENTLY ASKED QUESTIONS</h1>
            <p className="pt-3 font-light">
              Got a question? We've got answers. If you have other question, see
              our support page
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 px-5 mt-10 md:grid-cols-3">
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
