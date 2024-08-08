import { CollectionConfig } from "payload";
import { headerNav } from "./fields/headerNav";
import { layoutField } from "./fields/layout";
import { slugField } from "./fields/slug";
import { regenerateStaticPage } from "./utilities/regenerateStaticPage";

export const pagesCollection: CollectionConfig = {
    slug: "pages",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "slug", "updatedAt"],
        preview: (doc, { locale }) => {
            if (doc?.slug) {
                return `${locale}/${doc.slug}`;
            }

            return "";
        },
    },
    access: {
        read: () => true,
    },
    hooks: {
        afterChange: [regenerateStaticPage],
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "publishedDate",
            type: "date",
            admin: {
                position: "sidebar",
            },
        },
        {
            type: "tabs",
            tabs: [
                {
                    label: "Main",
                    fields: [headerNav(), layoutField()],
                },
            ],
        },
        slugField(),
    ],
};
