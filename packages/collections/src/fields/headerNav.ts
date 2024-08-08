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
                    type: "array",
                    maxRows: 6,
                    fields: [
                        link({
                            appearances: false,
                        }),
                    ],
                },
            ],
        },
        overrides
    );
