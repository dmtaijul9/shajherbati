/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

import { config } from "@keystone-6/core";

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from "./schema";

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from "./auth";
import { extendGraphQlSchema } from "./mutations";

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: "sqlite",
      url: "file:./keystone.db",
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: async ({ session, db }) => {
        if (session) {
          const user = await db?.User?.findOne({
            where: { id: session?.itemId },
          });
          return user?.userType === "admin";
        }
        return !!session?.data;
      },
    },
    lists,
    session,
    storage: {
      my_local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `${process.env.BACKEND_URL}/images${path}`,
        serverRoute: {
          path: "/images",
        },
        storagePath: "public/images",
      },
    },
    server: {
      cors: {
        credentials: true,
        origin: [`${process.env.DASHBOARD_URL}`],
      },
    },
    extendGraphqlSchema: extendGraphQlSchema,
  })
);
