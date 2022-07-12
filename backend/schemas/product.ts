import { list } from "@keystone-6/core";
import { float, relationship, text } from "@keystone-6/core/fields";

export const product = list({
  // Here are the fields that `User` will have. We want an email and password so they can log in
  // a name so we can refer to them, and a way to connect users to posts.
  fields: {
    name: text({ validation: { isRequired: true } }),
    slug: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    category: text(),
    price: float({ validation: { isRequired: true } }),
    brand: text(),
    rating: float({ defaultValue: 0 }),
    numReviews: float({ defaultValue: 0 }),
    countInStock: float({ validation: { isRequired: true } }),
    description: text(),
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
      initialColumns: ["name", "products"],
    },
  },
});
