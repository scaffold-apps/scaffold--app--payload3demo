import type { Field } from "payload";

import deepMerge from "../utilities/deepMerge";
import link from "./link";

type FooterNavProps = Partial<Field>;

export const footerNav = (overrides: FooterNavProps = {}) =>
    deepMerge<Field, Partial<Field>>(
        {
            name: "footer",
            type: "group",
            fields: [
                {
                    name: "showFooter",
                    type: "checkbox",
                    defaultValue: true,
                },
                {
                    name: "logo",
                    type: "relationship",
                    relationTo: "media",
                },
                {
                    name: "companyName",
                    type: "text",
                },
                {
                    name: "copyrightLine",
                    type: "text",
                },

                {
                    name: "socialButtons",
                    type: "array",
                    label: "Social Media Buttons",
                    fields: [
                        {
                            name: "url",
                            type: "text",
                            required: true,
                        },
                        {
                            name: "icon",
                            type: "upload",
                            relationTo: "media",
                            required: true,
                        },
                    ],
                },

                {
                    name: "footerColumns",
                    type: "array",
                    maxRows: 3,
                    fields: [
                        {
                            name: "columnLinks",
                            type: "array",
                            maxRows: 6,
                            label: "Column Links",
                            fields: [link()],
                        },
                    ],
                },
            ],
        },
        overrides
    );
