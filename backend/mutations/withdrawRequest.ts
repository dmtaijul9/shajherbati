import { KeystoneContext } from "@keystone-6/core/types";

interface withdrawRequest {
  amount: number;
  bkashNumber: string;
}

export default async function withdrawRequest(
  root: any,
  args: withdrawRequest,
  context: KeystoneContext
) {
  const { amount, bkashNumber } = await args;
  const sesh = context.session;
  if (!sesh.itemId) {
    throw new Error("You Must be logged in to do this!");
  }

  const createdRequest = await context.db.Withdraw.createOne({
    data: {
      amount,
      bkashNumber,
      user: { connect: { id: sesh.itemId } },
    },
  });

  if (createdRequest) {
    const currentAmount = await context.query.User.findOne({
      where: { id: sesh.itemId },
      query: "paymentDue",
    });

    const updatedAmount = await context.db.User.updateOne({
      where: { id: sesh.itemId },
      data: {
        paymentDue: currentAmount.paymentDue - amount,
      },
    });
  }

  return createdRequest;
}
