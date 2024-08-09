import type { ArrayField, Field } from "payload";
import deepMerge from "../utilities/deepMerge";
import link, { LinkAppearances } from "./link";

interface LinkGroupProps {
    overrides?: Partial<ArrayField>;
    appearances?: LinkAppearances[] | false;
}

const linkGroup = ({ overrides = {}, appearances }: LinkGroupProps = {}) => {
    const generatedLinkGroup: Field = {
        name: "links",
        type: "array",
        fields: [
            link({
                appearances,
            }),
        ],
    };

    return deepMerge(generatedLinkGroup, overrides);
};

export default linkGroup;
