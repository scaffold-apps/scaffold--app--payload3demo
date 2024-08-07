import { GlobalConfig } from "payload";
import { selectField } from "../fields/select";

export const Theme: GlobalConfig = {
    slug: "theme",
    fields: [
        selectField({
            name: "theme",
            options: [
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
            ],
            defaultValue: "dark",
        }),
    ],
};
