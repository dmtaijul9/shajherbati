import { list } from "@keystone-6/core";
import {
  float,
  password,
  relationship,
  select,
  text,
} from "@keystone-6/core/fields";

export const user = list({
  // Here are the fields that `User` will have. We want an email and password so they can log in
  // a name so we can refer to them, and a way to connect users to posts.
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true,
    }),
    // The password field takes care of hiding details and hashing values
    password: password({ validation: { isRequired: true } }),
    // Relationships allow us to reference other lists. In this case,
    // we want a user to have many posts, and we are saying that the user
    // should be referencable by the 'author' field of posts.
    // Make sure you read the docs to understand how they work: https://keystonejs.com/docs/guides/relationships#understanding-relationships
    products: relationship({ ref: "Product.user", many: true }),
    parcel: relationship({ ref: "Parcel.user", many: true }),
    userType: select({
      options: [
        { label: "Admin", value: "admin" },
        { label: "Reseller", value: "reseller" },
      ],
      defaultValue: "reseller",
    }),
    bkash: text(),
    fbPageName: text(),
    address: text(),
    paymentDue: float({ defaultValue: 0 }),
    withdrawn: relationship({ ref: "Withdraw.user", many: true }),
  },

  // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
  ui: {
    listView: {
      initialColumns: [],
    },
  },
});
