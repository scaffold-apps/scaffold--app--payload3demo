import { GlobalConfig } from "payload";

export const Website: GlobalConfig = {
    slug: "website",
    fields: [
        {
            name: "name",
            type: "text",
        },
        {
            name: "logo",
            type: "relationship",
            relationTo: "media",
        },
    ],
};
