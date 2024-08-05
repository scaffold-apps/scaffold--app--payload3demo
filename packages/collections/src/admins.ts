import { CollectionConfig } from "payload";

export const adminCollection: CollectionConfig = {
    slug: "admins",
    auth: true,
    access: {
        read: ({ req: { user } }) => user?.collection === adminCollection.slug,
        create: ({ req: { user } }) =>
            user?.collection === adminCollection.slug,
        update: ({ req: { user } }) =>
            user?.collection === adminCollection.slug,
        delete: ({ req: { user } }) =>
            user?.collection === adminCollection.slug,
    },
    fields: [],
};
