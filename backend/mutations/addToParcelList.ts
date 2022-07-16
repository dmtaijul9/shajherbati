import { KeystoneContext } from "@keystone-6/core/types";
interface ProductInputForPercel {
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface AddToCartInput {
  name: string;
  address: string;
  deliveryCharge: number;
  phoneNumber: string;
  sellPrice: number;
  shippingMethod: string;
  parcelItems: ProductInputForPercel;
}

export default async function addToCart(
  root: any,
  args: AddToCartInput,
  context: KeystoneContext
) {
  const {
    address,
    deliveryCharge,
    name,
    parcelItems,
    phoneNumber,
    sellPrice,
    shippingMethod,
  } = await args;
  const sesh = context.session;

  console.log(args);

  if (!sesh.itemId) {
    throw new Error("You Must be logged in to do this!");
  }
  /*   const allCartItems = await context.query.Parcel.findMany({
    where: { user: { id: { equals: sesh.itemId } } },
  }); */
  const resul = JSON.parse(JSON.stringify(parcelItems));
  console.log(resul);

  const parcel = context.db.Parcel.createOne({
    data: {
      name,
      address,
      phoneNumber,
      sellPrice,
      deliveryCharge,
      shippingMethod,
      user: { connect: { id: sesh.itemId } },
      items: {
        create: parcelItems,
      },
    },
  });

  return parcel;
}
