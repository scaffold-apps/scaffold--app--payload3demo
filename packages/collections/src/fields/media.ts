import type { UploadField } from "payload";

export const mediaField = (
    overrides: Partial<UploadField> = {}
): UploadField => ({
    name: "media",
    type: "upload",
    relationTo: "media",
    required: true,
    ...overrides,
});
