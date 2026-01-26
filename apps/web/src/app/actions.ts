"use server";

import { getPlaceholder } from "next-image-placeholder";

export async function getPlaceholderAction(url: string) {
    return getPlaceholder(url);
}
