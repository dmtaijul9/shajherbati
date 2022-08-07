import { list } from "@keystone-6/core";
import { float, relationship, text } from "@keystone-6/core/fields";

export const parcelItem = list({
  // Here are the fields that `User` will have. We want an email and password so they can log in
  // a name so we can refer to them, and a way to connect users to posts.
  fields: {
    name: text({ validation: { isRequired: true } }),
    imageUrl: text({ validation: { isRequired: true } }),
    price: float({ validation: { isRequired: true } }),
    quantity: float({ validation: { isRequired: true } }),
    parcel: relationship({ ref: "Parcel.items" }),
  },
  // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
  ui: {
    listView: {},
  },
});
