import { list } from "@keystone-6/core";
import { text, image } from "@keystone-6/core/fields";

export const imgData = list({
  fields: {
    image: image({ storage: "my_local_images" }),
  },
});
