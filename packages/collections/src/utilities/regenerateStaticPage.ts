import type { CollectionAfterChangeHook } from "payload";

export const regenerateStaticPage: CollectionAfterChangeHook<any> = async ({
    req: { payload },
    doc,
}) => {
    let path = `/${doc.slug}`;

    if (path === "/home") {
        path = "/";
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_CMS_URL}/api/revalidate?secret=${process.env.PAYLOAD_PRIVATE_REGENERATION_SECRET}&path=${path}`
        );
        if (res.ok) {
            payload.logger.info(`Now regenerating path '${path}'`);
        } else {
            payload.logger.info(`Error regenerating path '${path}'`);
        }
    } catch (err) {
        payload.logger.info(`Error hitting regeneration route for '${path}'`);
    }
};
