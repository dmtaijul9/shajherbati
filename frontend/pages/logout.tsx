/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";
import { LOGOUT } from "../resolvers/user/mutation";
import { ME } from "../resolvers/user/query";

const logout = () => {
  const [logOut] = useMutation(LOGOUT);
  const router = useRouter();

  logOut({
    refetchQueries: [{ query: ME }],
  });

  setTimeout(() => {
    router.push("/login");
  }, 2000);

  return (
    <Layout title="Logout page">
      <div>Loging Out</div>
    </Layout>
  );
};

export default logout;
