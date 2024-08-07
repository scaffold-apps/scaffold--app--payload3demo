import type { Field } from "payload";

import deepMerge from "../utilities/deepMerge";

type Select = (options?: {
    overrides?: Partial<Field>;
    name: string;
    options: { label: string; value: string }[];
    defaultValue?: string;
}) => Field;

export const selectField: Select = (
    { overrides = {}, name, options, defaultValue } = {
        name: "",
        options: [],
        defaultValue: "",
    }
) =>
    deepMerge<Field, Partial<Field>>(
        {
            name,
            label: capitalizeFirstLetter(name),
            type: "select",
            options: options || [],
            defaultValue,
        },
        overrides
    );

function capitalizeFirstLetter(input: string): string {
    if (!input) return "";
    return input.charAt(0).toUpperCase() + input.slice(1);
}
