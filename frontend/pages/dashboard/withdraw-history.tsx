import { useQuery } from "@apollo/client";
import Layout from "../../components/Layout";
import useUser from "../../lib/hooks/useUser";
import { USER_WITHDRAW_REQ } from "../../resolvers/withdraw/query";

const withdrawHistory = () => {
  const user = useUser();
  const { data, loading, error } = useQuery(USER_WITHDRAW_REQ, {
    variables: { userId: user?.id },
  });
  console.log(data);

  return (
    <Layout title="Withdraw History">
      <section>
        <div className="pb-4 mb-5 text-2xl font-bold text-center border-b-2 border-amber-400">
          <h1>Withdraw History</h1>
        </div>
        <div>
          {" "}
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                {/*      <th className="px-5 text-left">Name</th> */}
                <th className="px-5 text-left">Bkash Number</th>
                <th className="px-5 text-center">Status</th>
                <th className="px-5 text-center">Amount</th>
                <th className="px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.withdraws.map((item: any, index: number) => (
                <tr key={index} className="border-b">
                  {/*   <td>{item.user.name}</td> */}
                  <td className="p-5 text-left">{item.bkashNumber}</td>
                  <td className="p-5 text-center">{item.status}</td>
                  <td className="p-5 text-center">{item.amount}</td>
                  <td className="p-5 text-right">
                    <a href={`/dashboard/withdraw/${item.id}}`}>View Details</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export default withdrawHistory;
