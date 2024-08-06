import { CollectionConfig } from "payload";
import { adminCollection } from "./admins";

export const customerCollection: CollectionConfig = {
    slug: "customers",
    auth: true,
    admin: {
        useAsTitle: "email",
    },
    access: {
        read: () => true,
        create: () => true,
        update: ({ req: { user } }) => {
            if (!user) return false;
            if (user.collection === adminCollection.slug) return true;
            return {
                id: {
                    equals: user.id,
                },
            };
        },
        delete: ({ req: { user } }) => {
            if (!user) return false;
            return user.collection === adminCollection.slug;
        },
    },
    fields: [],
};
