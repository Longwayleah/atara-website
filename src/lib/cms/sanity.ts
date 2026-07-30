import type { SanityClient } from "@sanity/client";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

/** Sanity client — returns null when CMS is not configured */
export function getSanityClient(): SanityClient | null {
  if (!projectId) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",
  });
}

export const isSanityConfigured = Boolean(projectId);
