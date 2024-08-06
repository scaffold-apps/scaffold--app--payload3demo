import type { Field } from "payload";

import { HeroBlock } from "../blocks/HeroBlock";
import deepMerge from "../utilities/deepMerge";

type LayoutBlocks = (overrides?: Partial<Field>) => Field;

export const layoutField: LayoutBlocks = (overrides = {}) =>
    deepMerge<Field, Partial<Field>>(
        {
            name: "layout",
            type: "blocks",
            required: true,
            blocks: [HeroBlock],
        },
        overrides
    );
