import { list } from "@keystone-6/core";
import { integer, relationship } from "@keystone-6/core/fields";

export const CartItem = list({
  //TODO
  //access:

  fields: {
    quantity: integer({
      defaultValue: 1,
      validation: {
        isRequired: true,
      },
    }),
    product: relationship({ ref: "Product", many: true }),
    user: relationship({ ref: "User.cart" }),
  },
  ui: {
    listView: {
      initialColumns: ["product", "quantity", "user"],
    },
  },
});
