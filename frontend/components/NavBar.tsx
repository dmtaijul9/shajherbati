/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import useUser from "../lib/hooks/useUser";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropDownLink";
import Cookies from "js-cookie";
import { Store } from "../utils/store";
import { useRouter } from "next/router";

const NavBar = () => {
  const user = useUser();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cardItemsCount, setCardItemsCount] = useState(0);
  useEffect(() => {
    setCardItemsCount(cart?.cartItems.reduce((a, b) => a + b.quantity, 0));
  }, [cart?.cartItems]);

  const logoutHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
  };
  return (
    <div className="shadow-sm bg-amber-300">
      <nav className="container flex items-center justify-between h-16 px-4 m-auto">
        <Link href="/">
          <a className="text-lg font-bold">Shajher Bati</a>
        </Link>
        <div>
          <Link href="/cart">
            <a className="p-2">
              Cart
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
                {" "}
                {user.name}{" "}
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right bg-white shadow-lg">
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/profile">
                    Profile
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/order-history">
                    Order History
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
            <Link href="/login">
              <a className="p-2">Login</a>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
