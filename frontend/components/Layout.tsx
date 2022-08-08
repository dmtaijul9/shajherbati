import Head from "next/head";
import NavBar from "./NavBar";

const Layout = ({ children, title }: { children: any; title: string }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - alekscreation` : "alekscreation"}</title>
        <meta name="description " content="Ecommerce website" />
        <link rel="icon" href="/fabicon.ico" />
      </Head>
      <div className="flex flex-col justify-between min-h-screen bg-gray-100 ">
        <header className="bg-white">
          <NavBar />
        </header>
        <main className="container px-4 m-auto mt-4"> {children} </main>
        <footer className="flex items-center justify-center h-10 bg-white border-t-2 shadow-inner">
          <p>Copyright &copy; 2022 Alekscreation</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
