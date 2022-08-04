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

  const parcel = await context.db.Parcel.updateOne({
    where: { id: parcelId },
    data: { status: status },
  });
  return parcel;
}
