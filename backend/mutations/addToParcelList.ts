import { KeystoneContext } from "@keystone-6/core/types";
interface ProductInputForPercel {
  map(arg0: (item: ProductInputForPercel) => number);
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  countInStock: number;
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

  const countInStockUpdateArr = parcelItems?.map(
    (item: ProductInputForPercel) => {
      return {
        where: { id: item.id },
        data: {
          countInStock: item.countInStock - item.quantity,
        },
      };
    }
  );

  const parcelItemsToStore = parcelItems?.map((item: ProductInputForPercel) => {
    return {
      name: item.name,
      imageUrl: item.imageUrl,
      price: item.price,
      quantity: item.quantity,
    };
  });

  if (!sesh.itemId) {
    throw new Error("You Must be logged in to do this!");
  }
  /*   const allCartItems = await context.query.Parcel.findMany({
    where: { user: { id: { equals: sesh.itemId } } },
  }); */

  const updatedCountInStock = await context.db.Product.updateMany({
    data: countInStockUpdateArr,
  });

  const parcel = await context.db.Parcel.createOne({
    data: {
      name,
      address,
      phoneNumber,
      sellPrice,
      deliveryCharge,
      shippingMethod,
      user: { connect: { id: sesh.itemId } },
      items: {
        create: parcelItemsToStore,
      },
    },
  });

  return parcel;
}
