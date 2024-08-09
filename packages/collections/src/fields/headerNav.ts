import type { Field } from "payload";

import deepMerge from "../utilities/deepMerge";
import link from "./link";

type HeaderNav = (overrides?: Partial<Field>) => Field;

export const headerNav: HeaderNav = (overrides = {}) =>
    deepMerge<Field, Partial<Field>>(
        {
            name: "header",
            type: "group",
            fields: [
                {
                    name: "showHeader",
                    type: "checkbox",
                    defaultValue: true,
                },
                {
                    name: "companyName",
                    type: "text",
                },
                {
                    name: "logo",
                    type: "relationship",
                    relationTo: "media",
                },

                {
                    name: "navItems",
                    type: "group",
                    fields: [
                        {
                            name: "spaceBetween",
                            type: "select",
                            label: "Space Between",
                            options: [
                                { label: "Extra Small", value: "space-x-2" },
                                { label: "Small", value: "space-x-4" },
                                { label: "Medium", value: "space-x-6" },
                                { label: "Large", value: "space-x-8" },
                                { label: "Extra Large", value: "space-x-12" },
                            ],
                            defaultValue: "space-x-4",
                            admin: {
                                description:
                                    "Select the space between elements",
                            },
                        },
                        {
                            name: "items",
                            type: "array",
                            maxRows: 6,
                            fields: [link()],
                        },
                    ],
                },
            ],
        },
        overrides
    );
