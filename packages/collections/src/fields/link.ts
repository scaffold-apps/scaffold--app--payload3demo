import type { Field } from "payload";

import deepMerge from "../utilities/deepMerge";

export const appearanceOptions = {
    primary: {
        label: "Primary Button",
        value: "primary",
    },
    secondary: {
        label: "Secondary Button",
        value: "secondary",
    },
    link: {
        label: "Link",
        value: "link",
    },
};

export type LinkAppearances = "primary" | "secondary" | "link";

type LinkType = (options?: {
    appearances?: LinkAppearances[] | false;
    disableLabel?: boolean;
    overrides?: Record<string, unknown>;
}) => Field;

const link: LinkType = ({
    appearances,
    disableLabel = false,
    overrides = {},
} = {}) => {
    const linkResult: Field = {
        name: "link",
        type: "group",
        admin: {
            hideGutter: true,
        },
        fields: [
            {
                type: "row",
                fields: [
                    {
                        name: "type",
                        type: "select",
                        options: [
                            {
                                label: "Custom URL",
                                value: "custom",
                            },
                            {
                                label: "Internal link",
                                value: "reference",
                            },
                        ],
                        defaultValue: "reference",
                        admin: {
                            width: "50%",
                        },
                    },
                    {
                        name: "newTab",
                        label: "Open in new tab",
                        type: "checkbox",
                        admin: {
                            width: "50%",
                            style: {
                                alignSelf: "flex-end",
                            },
                        },
                    },
                ],
            },
        ],
    };

    const linkTypes: Field[] = [
        {
            name: "reference",
            label: "Document to link to",
            type: "relationship",
            relationTo: ["pages"],
            required: true,
            maxDepth: 1,
            admin: {
                condition: (_, siblingData) =>
                    siblingData?.type === "reference",
            },
        },
        {
            name: "url",
            label: "Custom URL",
            type: "text",
            required: true,
            admin: {
                condition: (_, siblingData) => siblingData?.type === "custom",
            },
        },
    ];

    if (!disableLabel) {
        linkTypes.map((linkType) => ({
            ...linkType,
            admin: {
                ...linkType.admin,
                width: "50%",
            },
        }));

        linkResult.fields.push({
            type: "row",
            fields: [
                ...linkTypes,
                {
                    name: "label",
                    label: "Label",
                    type: "text",
                    required: true,
                    admin: {
                        width: "50%",
                    },
                },
            ],
        });
    } else {
        linkResult.fields = [...linkResult.fields, ...linkTypes];
    }

    if (appearances !== false) {
        let appearanceOptionsToUse = [
            appearanceOptions.primary,
            appearanceOptions.secondary,
            appearanceOptions.link,
        ];

        if (appearances) {
            appearanceOptionsToUse = appearances.map(
                (appearance) => appearanceOptions[appearance]
            );
        }

        linkResult.fields.push({
            type: "row",
            fields: [
                {
                    name: "appearance",
                    type: "select",
                    defaultValue: "default",
                    options: appearanceOptionsToUse,
                    admin: {
                        description: "Choose how the link should be rendered.",
                        width: "50%",
                    },
                },
                {
                    name: "size",
                    type: "select",
                    defaultValue: "medium",
                    options: [
                        { label: "Small", value: "small" },
                        { label: "Medium", value: "medium" },
                        { label: "Large", value: "large" },
                    ],
                    admin: {
                        description: "Choose the size of the link.",
                        width: "50%",
                    },
                },
            ],
        });
    }

    return deepMerge(linkResult, overrides);
};

export default link;
