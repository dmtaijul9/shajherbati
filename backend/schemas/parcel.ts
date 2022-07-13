import { list } from "@keystone-6/core";
import { float, relationship, select, text } from "@keystone-6/core/fields";

export const parcel = list({
  // Here are the fields that `User` will have. We want an email and password so they can log in
  // a name so we can refer to them, and a way to connect users to posts.
  fields: {
    name: text({ validation: { isRequired: true } }),
    address: text({ validation: { isRequired: true } }),
    phoneNumber: text({ validation: { isRequired: true } }),
    sellPrice: float({ validation: { isRequired: true } }),
    resellerPrice: float({ validation: { isRequired: true } }),
    deliveryCharge: float({ validation: { isRequired: true } }),
    shippingMethod: text({ validation: { isRequired: true } }),
    quantity: float({ validation: { isRequired: true } }),
    status: select({
      options: [
        { label: "Parcel Pending", value: "pending" },
        { label: "Parcel Accepted", value: "accepted" },
        { label: "Out For Delivery", value: "outForDelivery" },
        { label: "Parcel Delivered", value: "delivered" },
        { label: "Parcel Returning", value: "returning" },
        { label: "Parcel Returned", value: "returned" },
        { label: "Peyment Pending", value: "paymentPending" },
        { label: "Payment Delivered", value: "paymentDelivered" },
      ],
      defaultValue: "pending",
    }),
    orderedProduct: relationship({
      ref: "Product",
      many: true,
    }),
  },
  // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
  ui: {
    listView: {},
  },
});
