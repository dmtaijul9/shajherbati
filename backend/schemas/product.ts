import { list } from "@keystone-6/core";
import {
  float,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";

export const product = list({
  // Here are the fields that `User` will have. We want an email and password so they can log in
  // a name so we can refer to them, and a way to connect users to posts.
  fields: {
    name: text({ validation: { isRequired: true } }),
    category: select({
      options: [
        { label: "Campaign", value: "campaign" },
        { label: "Unstitched Dress", value: "unstitchedDress" },
        { label: "Lehenga", value: "lehenga" },
        { label: "Womens Fashion", value: "womensFashion" },
        { label: "T-shirt ", value: "tShirt" },
        { label: "Panjabi", value: "panjabi" },
      ],
      defaultValue: "womensFashion",
    }),
    price: float({ validation: { isRequired: true } }),
    brand: text(),
    countInStock: float({ validation: { isRequired: true } }),
    description: text(),
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
    user: relationship({ ref: "User.products", many: false }),
    productImg: relationship({
      ref: "Image",
      many: true,
      ui: {
        createView: {
          fieldMode: "edit",
        },
      },
    }),
  },
  // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
  ui: {
    listView: {
      initialColumns: [],
    },
  },
});
