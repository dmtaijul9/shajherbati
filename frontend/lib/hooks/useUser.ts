import { useQuery } from "@apollo/client";
import { ME } from "../../resolvers/user/query";

export default function useUser() {
  const { data } = useQuery(ME);
  return data?.authenticatedItem;
}
