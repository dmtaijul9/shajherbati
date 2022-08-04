import { list } from "@keystone-6/core";
import {
  float,
  password,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";

export const withdraw = list({
  // Here are the fields that `User` will have. We want an email and password so they can log in
  // a name so we can refer to them, and a way to connect users to posts.
  fields: {
    amount: float({ validation: { isRequired: true } }),
    bkashNumber: text({ validation: { isRequired: true } }),
    status: select({
      options: [
        { label: "Pending", value: "pending" },
        { label: "Done", value: "done" },
      ],
      defaultValue: "pending",
    }),
    time: timestamp({ defaultValue: { kind: "now" } }),
    transationID: text(),
    user: relationship({ ref: "User.withdrawn" }),
  },

  // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
  ui: {
    listView: {
      initialColumns: [],
    },
  },
});
