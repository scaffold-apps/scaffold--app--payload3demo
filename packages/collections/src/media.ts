import { CollectionConfig } from "payload";

export const mediaCollection: CollectionConfig = {
    slug: "media",
    upload: true,
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "alt",
            type: "text",
            required: true,
        },
    ],
};
