import type { Block } from "payload";

import { invertBackground } from "../../fields/invertBackground";
import linkGroup from "../../fields/linkGroup";
import { mediaField } from "../../fields/media";
import { textField } from "../../fields/text";

export const HeroBlock: Block = {
    slug: "heroBlock",
    fields: [
        invertBackground,
        mediaField({ name: "logo", required: false }),
        textField({ name: "title" }),
        textField({ name: "description" }),
        linkGroup({
            appearances: ["primary", "secondary"],
            overrides: {
                maxRows: 2,
            },
        }),
        textField({ name: "subtext" }),
    ],
};
