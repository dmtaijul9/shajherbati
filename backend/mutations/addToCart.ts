import { KeystoneContext } from "@keystone-6/core/types";

export default async function addToCart(
  root: any,
  {
    productId,
  }: {
    productId: string;
  },
  context: KeystoneContext
) {
  const sesh = context.session;

  if (!sesh.itemId) {
    throw new Error("You Must be logged in to do this!");
  }

  console.log(context?.query.CartItem);

  const allCartItems = await context?.query.CartItem.findMany({});
}
