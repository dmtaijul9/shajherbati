import React from "react";

const unKnownPage = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full h-screen bg-gray-200">
      <h1 className="font-extrabold tracking-widest text-9xl">404</h1>
      <div className="absolute px-2 text-sm rounded bg-amber-400 rotate-12">
        Page Not Found
      </div>
      <a href="/">
        <button className="mt-5 primary-button">Go To Home</button>
      </a>
    </main>
  );
};

export default unKnownPage;
