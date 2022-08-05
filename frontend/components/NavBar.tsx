/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import useUser from "../lib/hooks/useUser";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropDownLink";
import Cookies from "js-cookie";
import { Store } from "../utils/store";
import { useRouter } from "next/router";
import {
  ShoppingCartIcon,
  UserCircleIcon,
  MenuIcon,
} from "@heroicons/react/outline";

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const user = useUser();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cardItemsCount, setCardItemsCount] = useState(0);
  useEffect(() => {
    setCardItemsCount(cart?.cartItems.reduce((a, b) => a + b.quantity, 0));
  }, [cart?.cartItems]);
  console.log(isNavOpen);

  const isNavOpenHandler = () => {
    setIsNavOpen(false);
  };

  const logoutHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
  };
  return (
    <div className="bg-gray-200 shadow-sm">
      <nav className="container relative px-4 m-auto">
        <div className="flex items-center justify-between w-full h-14">
          <div className="flex items-center justify-center space-x-5">
            {" "}
            <button
              className="md:hidden "
              onClick={() => {
                setIsNavOpen(!isNavOpen);
              }}
            >
              {" "}
              <MenuIcon width={20} height={20} />{" "}
            </button>
            <Link href="/">
              <a className="text-lg font-bold">In-style</a>
            </Link>
          </div>
          <div>
            <Link href="/cart">
              <a className="p-2 mr-2">
                <ShoppingCartIcon className="inline-block w-5 h-5" />
                {cardItemsCount > 0 && (
                  <span className="px-2 py-1 ml-1 text-xs font-bold text-white bg-red-600 rounded-full">
                    {cardItemsCount}{" "}
                  </span>
                )}
              </a>
            </Link>
            {user ? (
              <Menu as={"div"} className="relative inline-block">
                <Menu.Button className="font-semibold border-b-2 border-black">
                  <UserCircleIcon className="inline-block w-5 h-5" />{" "}
                  {user.name}{" "}
                </Menu.Button>

                <Menu.Items className="absolute right-0 z-10 z-20 w-56 origin-top-right bg-white shadow-lg">
                  {user?.userType === "admin" && (
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/dashboard/create-product"
                      >
                        Create Product
                      </DropdownLink>
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/dashboard/profile"
                    >
                      Profile
                    </DropdownLink>
                  </Menu.Item>
                  {user?.userType === "admin" && (
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/dashboard/ordered-parcel"
                      >
                        Ordered Parcel
                      </DropdownLink>
                    </Menu.Item>
                  )}

                  {user?.userType !== "admin" && (
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/dashboard/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/dashboard/payment"
                    >
                      Payment
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/dashboard/withdraw-history"
                    >
                      Withdraw History
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/logout"
                      onClick={logoutHandler}
                    >
                      Logout
                    </DropdownLink>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <>
                <Link href="/login">
                  <a className="p-2">Login</a>
                </Link>
                <Link href="/signup">
                  <a className="p-2">Sign Up</a>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hidden md:space-x-2 md:h-14 md:flex md:items-center md:justify-center">
          <Link href="/campaign">
            <a className="p-2">Campaign</a>
          </Link>
          <Link href="/unstitched-dress">
            <a className="p-2">Unstitched Dress</a>
          </Link>
          <Link href="/lehenga">
            <a className="p-2">Lehenga</a>
          </Link>
          <Link href="/womens-fashion">
            <a className="p-2">Women's Fashion</a>
          </Link>
          <Link href="/panjabi">
            <a className="p-2">Panjabi</a>
          </Link>
          <Link href="/t-shirt ">
            <a className="p-2">T-shirt</a>
          </Link>
        </div>

        {isNavOpen && (
          <div className="absolute left-0 z-10 flex flex-col items-center justify-center w-screen min-h-screen space-y-5 bg-gray-200 md:hidden">
            <Link href="/campaign">
              <a className="p-2">Campaign</a>
            </Link>
            <Link href="/unstitched-dress">
              <a className="p-2">Unstitched Dress</a>
            </Link>
            <Link href="/lehenga">
              <a className="p-2">Lehenga</a>
            </Link>
            <Link href="/womens-fashion">
              <a className="p-2">Women's Fashion</a>
            </Link>
            <Link href="/panjabi">
              <a className="p-2">Panjabi</a>
            </Link>
            <Link href="/t-shirt ">
              <a className="p-2">T-shirt</a>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
