import type { Field } from "payload";

import deepMerge from "../utilities/deepMerge";

type Text = (options?: { overrides?: Partial<Field>; name: string }) => Field;

export const textField: Text = ({ overrides = {}, name } = { name: "" }) =>
    deepMerge<Field, Partial<Field>>(
        {
            name,
            label: capitalizeFirstLetter(name),
            type: "text",
        },
        overrides
    );

function capitalizeFirstLetter(input: string): string {
    if (!input) return "";
    return input.charAt(0).toUpperCase() + input.slice(1);
}
