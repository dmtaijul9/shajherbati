import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import { useApollo } from "../lib/withData";
import { Store, reducer, initialState } from "../utils/store";
import { useEffect, useReducer, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  const apolloClient = useApollo(pageProps);
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }
  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <ApolloProvider client={apolloClient}>
        <Store.Provider value={value}>
          <Component {...pageProps} />
          <ToastContainer />
        </Store.Provider>
      </ApolloProvider>
    );
  }
}

export default MyApp;
