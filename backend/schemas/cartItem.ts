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
    product: relationship({ ref: "Product" }),
    user: relationship({ ref: "User.cartItem" }),
  },
  ui: {
    listView: {
      initialColumns: ["product", "quantity", "user"],
    },
  },
});
