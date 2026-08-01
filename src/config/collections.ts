export type ProductCollection = "core";

export const collections: Record<
  ProductCollection,
  {
    id: ProductCollection;
    eyebrow: string;
    title: string;
    description: string;
  }
> = {
  core: {
    id: "core",
    eyebrow: "The protocol lineup",
    title: "Our Protocols",
    description:
      "Radiance, Recovery, Renew, Refine, and Essential — intentionally curated cellular-wellness protocols.",
  },
};

export const collectionOrder: ProductCollection[] = ["core"];
