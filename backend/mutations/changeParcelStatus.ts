import { KeystoneContext } from "@keystone-6/core/types";

interface changeParcelStatus {
  status: string;
  parcelId: string;
}

export default async function changeParcelStatus(
  root: any,
  args: changeParcelStatus,
  context: KeystoneContext
) {
  const { status, parcelId } = await args;
  const sesh = context.session;

  if (!sesh.itemId) {
    throw new Error("You Must be logged in to do this!");
  }

  if (status === "paymentDelivered") {
    const { sellPrice, deliveryCharge, user } =
      await context.query.Parcel.findOne({
        where: { id: parcelId },
        query: `sellPrice deliveryCharge user {paymentDue id}`,
      });

    const { items } = await context.query.Parcel.findOne({
      where: { id: parcelId },
      query: `items {price quantity}`,
    });

    const total = items
      .map((item: any) => item.price * item.quantity)
      .reduce((sum, item) => (sum += item));

    const profit = sellPrice - (total + deliveryCharge);

    const updatedPaymentDue = await context.db.User.updateOne({
      where: { id: user.id },
      data: {
        paymentDue: user.paymentDue + profit,
      },
    });
  }

  if (status === "returned") {
    const { deliveryCharge, user } = await context.query.Parcel.findOne({
      where: { id: parcelId },
      query: `sellPrice deliveryCharge user {paymentDue id}`,
    });

    const updatedPaymentDue = await context.db.User.updateOne({
      where: { id: user.id },
      data: {
        paymentDue: user.paymentDue - deliveryCharge,
      },
    });
  }

  const parcel = await context.db.Parcel.updateOne({
    where: { id: parcelId },
    data: { status: status },
  });
  return parcel;
}
